# MCP: how AI connects to useful tools.

An AI assistant can explain a report without being able to open the system that produced it. MCP addresses the connection problem: how an AI application discovers and uses capabilities exposed by another program.

This guide starts with an everyday analogy, then separates the application, the model and the server. All examples are fictional. The browser experiments are simulations; they do not connect to a real MCP server or your accounts.

## What does MCP mean? {#what-is-mcp}

**MCP means Model Context Protocol.** It is an open protocol for exchanging context and capabilities between an AI application and external programs. A server can expose useful operations, readable information and reusable prompt templates through a standard interface.

Think of a **hotel reception desk**. You ask the receptionist for a room-service menu or a booking. The receptionist checks what services exist and contacts the appropriate department. The receptionist is not the kitchen, and the connection method does not decide whether you are authorized to order anything.

In an AI application, a model may help choose a tool and its arguments. The application mediates the request. The MCP server implements the exposed operation or delegates it to another system. The model does not become a database administrator simply because a server offers a database tool.

**Example throughout this guide:** “Show me the data-quality summary for the demo branch dataset.” A fictional server offers a read-only tool named `get_quality_summary`. It returns counts from a tiny predefined example, and the assistant can explain those counts.

MCP is a protocol, not an AI model, a vector database or an automatic grant of access. It does not require a particular model vendor, and it does not mean every AI application supports every server feature.

## The host, client and server {#architecture}

The **host** is the AI application that coordinates the user experience, model use and policy decisions. An **MCP client** is the protocol participant managed by that host. An **MCP server** is the program exposing capabilities. One host may manage several clients, each communicating with a particular server.

<!-- lab:mcp-architecture -->

| Component | Plain-language job | Fictional example |
| --- | --- | --- |
| User | States the intended task | Ask for a dataset-quality summary |
| Host | Coordinates the application and its permission policy | A desktop assistant application |
| Model | Helps interpret the request or propose a tool call | Select a relevant tool name and arguments |
| Client | Exchanges MCP messages with a server | Send the selected request through the supported transport |
| Server | Exposes and implements capabilities | Validate the dataset ID and compute or fetch a summary |
| Underlying system | Supplies data or carries out an operation | A database, API, file collection or local function |

“Server” does not necessarily mean a remote cloud machine. An MCP server can be a local process. A remote server may itself use several services behind the scenes. The model need not be hosted inside the MCP server.

## Tools, resources and prompts {#building-blocks}

The three common server-side building blocks answer different questions: **What can I do? What can I read? What reusable instructions can I select?**

| Building block | Meaning | Example |
| --- | --- | --- |
| Tool | A callable operation with described inputs | `get_quality_summary(dataset_id)` |
| Resource | Addressable context exposed for reading | A policy document identified by a resource URI |
| Prompt | A reusable template selected for a task | A template for explaining a quality report |

A tool may read data, calculate a result or change an external system. A tool called “read” still needs appropriate access checks. Resource URIs identify content; they are not necessarily ordinary web URLs. A prompt template is not a trained model and does not grant permission to use a tool.

The typical interaction descriptions are **model-controlled tools**, **application-controlled resources** and **user-selected prompts**. Actual host interfaces vary; those descriptions do not mean the model bypasses host policy or user controls.

**Tool schema** means a machine-readable description of expected arguments, commonly using JSON Schema. **Discovery** means finding available capabilities and their descriptions. Discovery tells the application what is offered; it does not guarantee the operation will be authorized or successful.

## Follow a request from question to result {#request-flow}

For the quality-summary example, the application discovers a suitable operation, interprets the user's request, checks policy, sends valid arguments, and handles the result. A clear tool description and a narrow input schema help avoid calling the wrong operation.

<!-- lab:mcp-request -->

The simulator shows **conceptual request fragments**, not complete wire messages. Modern MCP requests include required protocol metadata not shown in the fragment. Its policy gate is a browser teaching control, not real authentication. Switching the gate off stops the simulated call before the server step.

Common protocol method names include `tools/list` for discovering tools and `tools/call` for invoking one. Resources use operations such as `resources/list` and `resources/read`; prompts use `prompts/list` and `prompts/get`. Not every server offers all categories.

**JSON-RPC** is the message format used by MCP. A request identifies a method and parameters and normally has an ID that associates the response with that request. Some protocol notifications have no response. Do not confuse a tool's business result with a transport error or an invalid protocol request.

After receiving a result, the host may present it directly or provide it to the model for explanation. A successful tool execution does not prove that the model's later interpretation is correct. Check calculations, units and source timestamps separately.

## Local and remote connections {#transports}

A **transport** describes how protocol messages travel. It does not define whether a tool is safe or whether its data is current.

| Transport | Simple explanation | Practical boundary |
| --- | --- | --- |
| stdio | Exchange messages through a client-launched process's standard streams | Common for local integrations; local code and file access still need scrutiny |
| Streamable HTTP | Exchange messages with an HTTP endpoint | Useful for independently running services; deployment and authorization must be configured |

Streamable HTTP can use a JSON response or request-scoped Server-Sent Events, depending on the protocol revision and interaction. SSE is a streaming technique; a streaming response does not mean the application is using the older, separate HTTP+SSE transport found in many early tutorials.

Local does not automatically mean private. A locally running server can call external APIs. Remote does not automatically mean a paid service. The server implementation, model provider and deployment determine cost and data movement; the protocol itself does not promise either one.

This article's simulator uses neither transport. It runs deterministic JavaScript in your browser and sends no MCP requests.

## Why protocol versions matter {#versions}

MCP is evolving. This guide was checked against the **2026-07-28 revision** on October 21, 2026. Always match examples to the version supported by your host, server and SDK.

| Revision family | Connection model to recognize |
| --- | --- |
| 2026-07-28 | Requests carry protocol version and capabilities as per-request metadata; there is no negotiation handshake |
| 2025-11-25 and earlier | Tutorials commonly show an `initialize` handshake and session-oriented capability negotiation |

This distinction matters when reading old diagrams or sample code. An initialization sequence from an earlier revision is not a universal requirement for every modern implementation. Some implementations support both eras for compatibility.

An SDK abstracts protocol details, but it does not make incompatible versions identical. For implementation work, use the official versioned specification and the documentation for the SDK release you actually install. This conceptual guide deliberately avoids presenting an untested installation command as a complete working server.

## MCP and RAG solve different problems {#rag-vs-mcp}

**RAG** describes a pattern for answering with retrieved evidence. **MCP** describes an interface for exposing capabilities and context. They can work together without being the same thing.

| Question | RAG | MCP |
| --- | --- | --- |
| Main concern | Retrieve evidence and use it to generate a grounded answer | Connect an application to external capabilities through a protocol |
| Needs vector search? | Optional; lexical, structured and other retrieval methods also work | No; a server can expose any appropriate supported capability |
| Changes the model's weights? | Normally no | No, not by merely connecting a server |
| Can it be used alone? | Yes, a RAG pipeline can call its data source directly | Yes, a tool can calculate a result without document retrieval |
| How might they combine? | A RAG pipeline retrieves passages and generates an answer | An MCP server exposes the search operation used by that pipeline |

<!-- lab:mcp-rag -->

For example, a server could expose `search_policies(question)`. Its implementation might use BM25, a vector database or a complete retrieval pipeline. The MCP interface does not tell you which algorithm is inside. Returned passages still need relevance checks, permission enforcement and citations when used in an answer.

If RAG is new to you, read the [visual RAG guide](../learn/rag.html). You do not need to finish it before understanding basic MCP architecture.

## Permissions and trust boundaries {#permissions}

**Authentication** establishes an identity. **Authorization** decides what that identity may do. **Consent or approval** expresses a user's permission for an interaction. These are related, but a friendly prompt or a successful connection is not a substitute for server-side access control.

- Expose narrowly scoped tools. Prefer a read-only summary operation before adding a write operation.
- Validate arguments and enforce authorization where the underlying operation is performed. A schema alone is not an access policy.
- Keep credentials outside article text, tool descriptions and model-visible logs. Use appropriate secret handling for the actual environment.
- Treat tool descriptions and returned content as potentially untrusted. Retrieved text can contain instructions that conflict with the user's intent.
- Use clear host controls for consequential actions and preserve useful audit records without logging sensitive data unnecessarily.

For HTTP-based MCP authorization, the official specification describes an OAuth-based approach. The stdio case has different credential-handling expectations. Do not assume one login flow applies to every transport or copy a token into every downstream request. Follow the applicable versioned authorization and security guidance.

The browser permission switch in this guide is only a lesson in where an application might stop a request. It does not implement OAuth, sandbox a server, or protect a real database.

## A small practice plan {#practice}

Start with a fictional dataset and one read-only operation. Write down the tool's name, its exact input fields, its return fields, and which identities should be permitted to call it. Define the expected behavior for an unknown dataset ID and an unavailable data source.

| Check | What to verify |
| --- | --- |
| Discovery | Only the intended capabilities are exposed with accurate descriptions |
| Valid request | A known dataset returns the expected counts and units |
| Invalid input | Unexpected fields and unknown IDs are handled deliberately |
| Permission denied | The underlying operation does not run without authorization |
| Server failure | The host distinguishes a failed operation from a valid empty result |
| Interpretation | The final explanation matches the returned values |

For this page, experiment with the simulator's operation selector, permission gate and failure switch. Then explain which component stopped the request and whether a server result was produced.

A future hands-on article can implement a local server using an official SDK and inspect it with the MCP Inspector. That implementation is **planned**, not part of this article. No real MCP server is deployed by this learning page.

## Misconceptions to leave behind {#misconceptions}

| Misconception | More useful understanding |
| --- | --- |
| MCP is another language model | It is a protocol used by applications and servers |
| The model directly controls every connected system | The host mediates requests and the server must enforce its boundaries |
| Every MCP server is a RAG system | A server may expose unrelated tools, resources or prompts |
| A tool response is always a correct final answer | Execution and interpretation need separate checks |
| A protocol standard solves security automatically | Implementations still need identity, permission and trust controls |
| A tutorial's initialization diagram applies forever | Match the diagram to the protocol revision and implementation |

**Explain it in one breath:** “MCP standardizes how an AI application discovers and uses external capabilities. The host manages the experience, a client speaks the protocol, and the server exposes operations or context. It can connect to a RAG retriever, but it does not replace retrieval design, model reasoning or access control.”

## Design a narrow tool contract {#mcp-contracts}

Intermediate implementation work begins with a contract. Define exactly what the operation accepts, returns and refuses. A tool name alone is too vague for a model or another developer to use reliably.

For the fictional quality-summary operation, the input contract might use this JSON Schema fragment:

```json
{
  "type": "object",
  "properties": {
    "dataset_id": {
      "type": "string",
      "enum": ["demo-branches", "demo-loans"]
    }
  },
  "required": ["dataset_id"],
  "additionalProperties": false
}
```

This fragment describes arguments; it is not a complete MCP tool registration or request. A real server must validate the input and enforce whether this particular caller may read that dataset. Being a valid enum value is not proof of access.

Define the result just as carefully: records, failed_records, passed_records, a named rate with its denominator, and an observation timestamp when applicable. Distinguish “no matching records” from “the source is unavailable.” Tell callers whether a result is partial or stale instead of returning a plausible-looking success.

**Exercise:** write one valid argument object, one with a missing dataset ID, and one with an unexpected field. Then describe the expected validation outcome and separately describe a valid request from an unauthorized user. Validation and authorization answer different questions.

## Operate across trust and failure boundaries {#mcp-operations}

Advanced MCP design includes the host's policy, the server's authorization checks and the underlying system's permissions. A user-approved host action does not automatically authorize every database operation behind the server.

| Boundary | Design question | Failure case |
| --- | --- | --- |
| Host to server | Which identity and scopes reach this endpoint? | A credential intended for one audience is accepted by another |
| Server to downstream API | How are delegated permissions enforced? | A broad service identity bypasses the caller's restrictions |
| Operation execution | Can the operation be retried safely? | A timed-out write is repeated and creates a duplicate action |
| Result to model | Which content can be treated as instructions? | An external result tries to redirect the assistant's task |
| Logs and monitoring | What can be observed without leaking data? | Credentials or sensitive result bodies are stored in ordinary logs |

Use least privilege and validate tokens for the intended audience according to the applicable authorization flow. Do not reuse an arbitrary incoming token as a universal downstream credential. Tool annotations or descriptions are not substitutes for enforcement.

**Idempotency** means repeating an operation has the same intended effect as doing it once. A read-only summary is different from creating a ticket or sending a message. Before retrying a consequential operation after a timeout, determine whether it already completed and whether the API supports a suitable idempotency mechanism.

A timeout means the caller stopped waiting; it does not prove that execution stopped. Likewise, cancellation is not necessarily a rollback. Plan for ambiguous outcomes and record useful correlation information without exposing secrets.

## Test protocol and business behavior separately {#mcp-validation}

A protocol-compatible message can still produce the wrong business result. Test the interface and the operation independently, then test their combination in a supported host.

| Test layer | Example evidence |
| --- | --- |
| Contract | Expected fields, types and rejection of unsupported arguments |
| Protocol compatibility | Requests conform to the selected revision and supported transport |
| Authorization | Two identities cannot read each other's restricted datasets |
| Business logic | Returned counts reconcile and the rate uses the documented denominator |
| Failure handling | Invalid input, source failures and timeouts remain distinguishable |
| Interpretation | The assistant's explanation does not invent a cause or omit uncertainty |

When changing SDK or protocol versions, keep a compatibility matrix for the actual host, client, server and transport. The version discussion earlier in this guide explains why blindly copying an older initialization sequence can be misleading. Run a small regression suite before migrating.

For operations that change data, add tests for duplicate delivery, retries, partial failure and the audit trail. These scenarios need controlled test systems, not a production account used as a teaching sandbox.

**Advanced exercise:** specify a safe operating contract for a future “create quality issue” tool: user identity, allowed fields, authorization, approval behavior, duplicate handling, failure reporting and audit data. Explain why the current browser simulator cannot establish those guarantees. This exercise is a design review; no write tool is deployed here.

## Read the primary sources {#sources}

- [MCP architecture overview](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)
- [Understanding MCP servers](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts)
- [2026-07-28 architecture specification](https://modelcontextprotocol.io/specification/2026-07-28/architecture)
- [2026-07-28 transport bindings](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports)
- [2026-07-28 versioning and compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning)
- [Tools specification](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
- [Resources specification](https://modelcontextprotocol.io/specification/2026-07-28/server/resources)
- [Authorization specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)
- [MCP security guidance](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices)
- [Earlier handshake-based lifecycle, for comparison](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle)
- [Official Python SDK documentation](https://py.sdk.modelcontextprotocol.io/)

Independent learning material by Pratikkumar Chaudhari, developed with AI assistance. Examples are fictional and browser-only. Reviewed against the linked official references on October 21, 2026; check newer specifications before implementing a real integration.
