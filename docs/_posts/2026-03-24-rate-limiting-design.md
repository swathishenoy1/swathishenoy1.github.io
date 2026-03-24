---
layout: post
title: "Designing a Rate Limiter"
categories: [systems, reliability]
excerpt: "A practical guide to rate limiting strategies, trade-offs, and production-ready architecture."
---

Rate limiting protects your system from abuse, throttles noisy neighbors, and smooths spikes. The best design depends on latency budgets, accuracy needs, and where enforcement happens.

## Core strategies
- **Token bucket**: Allows bursts while enforcing an average rate.
- **Leaky bucket**: Smooths traffic to a fixed output rate.
- **Fixed window**: Simple counters per time window.
- **Sliding window**: More accurate but needs extra state.

## Where to enforce
- **Edge (CDN / API gateway)**: Best for early rejection and cost control.
- **Service layer**: Ensures per-tenant or per-feature limits.
- **Background systems**: Batch jobs and worker pools.

## Storage choices
- **In-memory + sharding**: Low latency, less durable.
- **Redis**: Common for shared state, supports atomic increments.
- **Local caches**: Fast but prone to inconsistencies without coordination.

## Common pitfalls
- Using fixed windows for bursty traffic.
- Sharing one global limit across different products.
- Missing observability on throttled requests.
