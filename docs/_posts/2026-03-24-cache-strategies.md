---
layout: post
title: "Caching Strategies That Actually Work"
categories: [systems, performance]
excerpt: "When to cache, where to cache, and how to avoid stale data nightmares."
---

Caching improves latency and reduces load, but it can also create subtle bugs. A good strategy balances freshness, cost, and simplicity.

## What to cache
- Read-heavy, slow-changing data.
- Computations that are expensive to recompute.
- Shared results across multiple users.

## Where to cache
- **Client**: Lowest latency, but harder to invalidate.
- **CDN**: Great for static or public content.
- **Application**: Flexible, easy to control.
- **Database**: Use carefully for small hot keys.

## Invalidation patterns
- **TTL-based**: Simple but can serve stale data.
- **Write-through**: Updates cache on writes.
- **Write-back**: High throughput, higher risk.
- **Cache-aside**: Most common, explicit control.

## Operational tips
- Measure hit rates by endpoint.
- Separate hot and cold keyspaces.
- Protect the origin with request coalescing.
