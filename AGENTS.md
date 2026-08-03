# AGENTS.md

# NEXO Platform — AI Agents Guide

Version: 1.0

Last Updated: 2026-08-03

---

# Purpose

This document defines the universal rules that every AI agent must follow while working on the NEXO Platform.

These rules apply regardless of the AI model being used.

Examples.

- Claude Code
- ChatGPT
- GitHub Copilot
- Cursor
- Windsurf
- Gemini
- Continue.dev
- Future AI agents

This document is technology agnostic.

---

# Project Philosophy

NEXO follows a **Documentation First** development methodology.

Documentation defines the product.

Code implements the documentation.

Documentation is always the source of truth.

---

# Core Principles

Every AI agent shall.

✓ Read documentation before coding.

✓ Preserve architecture.

✓ Respect business rules.

✓ Produce maintainable code.

✓ Keep documentation synchronized.

✓ Explain important decisions.

Never violate these principles.

---

# Documentation Structure

```
docs/

00-foundation/

01-product/

02-data/

03-ai/

04-engineering/
```

Every implementation depends on these documents.

---

# Reading Order

Before implementing.

```
Foundation

↓

Product

↓

Data

↓

AI

↓

Engineering
```

Never skip documentation.

---

# Single Source of Truth

When documentation and implementation disagree.

Documentation wins.

Never assume undocumented behavior.

---

# Development Lifecycle

Every task follows.

```
Understand

↓

Read documentation

↓

Plan

↓

Explain

↓

Implement

↓

Test

↓

Document

↓

Review
```

---

# Responsibilities

Every AI is responsible for.

- preserving architecture;

- avoiding duplicated logic;

- maintaining readability;

- respecting naming conventions;

- respecting documentation.

---

# Required Documentation

Depending on the task.

## Product

- PRD
- Business Rules

---

## Architecture

- Architecture
- Assessment Engine

---

## Data

- Data Model
- API Contracts

---

## Engineering

- Definition of Ready
- Definition of Done
- Development Standards

Only load the documentation required for the current task.

---

# Architecture Rules

Always preserve.

```
Presentation

↓

Application

↓

Domain

↓

Infrastructure
```

Business logic belongs inside the Domain layer.

Never inside UI.

---

# Coding Rules

Always.

- TypeScript Strict

- Explicit Naming

- Small Functions

- Small Components

- Pure Functions

- Composition over Inheritance

Never.

- use any

- duplicate logic

- bypass domain

- hardcode business rules

---

# Business Rules

Business Rules are immutable unless documentation changes.

AI shall never invent.

- rules

- calculations

- workflows

- entities

- archetypes

---

# API Rules

Never create undocumented endpoints.

Always follow API Contracts.

---

# Database Rules

Every persistence operation must follow.

```
Domain

↓

Mapper

↓

Repository

↓

Prisma

↓

Database
```

Never access the ORM directly from UI.

---

# Documentation Rules

Whenever implementation changes behavior.

Update documentation.

At minimum.

- affected document

- changelog

- release notes (when applicable)

---

# Testing Rules

Every important implementation requires.

- unit tests

- integration tests when applicable

- regression prevention

Untested code is incomplete.

---

# AI Collaboration

Multiple AI agents may work together.

Every agent should.

- have a single responsibility;

- avoid overlapping work;

- document assumptions;

- communicate affected modules.

---

# Context Management

Always use the smallest context possible.

Prefer Context Packs defined in.

```
08E_AI_CONTEXT_PACKS.md
```

Never load unnecessary documentation.

---

# Review Process

Before completing a task.

Verify.

✓ Architecture

✓ Business Rules

✓ Typing

✓ Tests

✓ Documentation

✓ Performance

✓ Security

---

# Stop Conditions

Stop immediately if.

- documentation is missing;

- business rules are ambiguous;

- API contracts do not exist;

- architecture conflicts appear;

- requirements contradict documentation.

Request clarification before proceeding.

---

# Communication Style

Always.

- explain decisions;

- explain trade-offs;

- identify affected documents;

- keep responses objective;

- avoid unnecessary complexity.

---

# Anti-Patterns

Never.

✖ Invent undocumented functionality.

✖ Change architecture silently.

✖ Ignore documentation.

✖ Duplicate components.

✖ Mix UI and domain logic.

✖ Bypass the Assessment Engine.

✖ Ignore Definition of Ready.

✖ Ignore Definition of Done.

---

# Project Goals

Every implementation should.

- improve maintainability;

- reduce complexity;

- preserve architecture;

- increase consistency;

- remain easy to understand.

---

# Success Criteria

A successful implementation is one that.

- follows documentation;

- passes tests;

- updates documentation;

- respects architecture;

- remains maintainable.

Speed is never more important than quality.

---

# Final Principle

Every AI agent is a contributor.

No AI is allowed to redefine the product.

The product is defined by the documentation.

The responsibility of every AI is to faithfully transform documentation into high-quality software.
