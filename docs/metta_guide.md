# MeTTa Programming Language Guide

## Overview
MeTTa is a symbolic programming language for artificial general intelligence (AGI). It handles abstract constructs like self-modifying code and supports neural-symbolic reasoning. Programs are represented as subgraphs of an Atomspace metagraph, enabling querying and rewriting.

### Key Concepts
- **Atoms**: Basic units (symbols, expressions).
- **Spaces**: Containers for atoms.
- **Matchers**: For pattern matching and rewriting.
- **Evaluation**: Executes expressions in a space.

### Code Examples

#### Basic Hello World
```metta
(= (hello) "Hello, World!")
```

#### Pattern Matching
```metta
(= (parent John Mary) ())
(= (parent John Bob) ())
(= (grandparent ?x ?z) (parent ?x ?y) (parent ?y ?z))
```

#### Evaluation Example
```metta
(eval (hello))  ; Outputs: "Hello, World!"
```

#### Symbolic Reasoning for Fact-Checking
```metta
(= (claim "Sports team won") true)
(= (verify-claim ?c) (if (match ?c true) "Verified" "Unverified"))
```

## Tutorials
- **Eval Intro**: https://metta-lang.dev/docs/learn/tutorials/eval_intro/main_concepts.html
- Covers main concepts like atoms, spaces, and evaluation.

## GitHub Repositories
- **Hyperon Experimental**: https://github.com/trueagi-io/hyperon-experimental (Core library in Rust).
- **MeTTa Examples**: https://github.com/trueagi-io/metta-examples (Sample programs).
- **MeTTa WAM**: Prolog-style reasoning.

## Integration with Hakika
- Use for symbolic logic in verification engines (e.g., cross-referencing claims).
- Detect deepfakes and ensure factual consistency in niches.

## References
- Site: https://metta-lang.dev/
- Medium Article: https://medium.com/singularitynet/metta-in-a-nutshell-exploring-the-language-of-agi-8d344c15b573
