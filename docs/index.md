---
layout: page
title: Kafka
---

# Kafka

This document provides a one-page overview of key Kafka concepts for system design interview preparation.

## What is Kafka?
Apache Kafka is an open-source distributed event streaming platform that can be used as a message queue or a stream processing system. It was created by LinkedIn mainly to help with logging but has evolved in its application since then.  


## Terminology

* **Kafka Cluster** - A Kafka cluster is a group of multiple brokers working together to store and serve data.
* **Broker** - A broker is a physical or virtual server that stores data and serves client requests. Each broker hosts partitions of topics (not queues) and handles read/write operations.
* **Partition** - Immutable, ordered sequence of records, where new records are appended (like a log).
* **Topic** - Logical grouping of partitions. We publish to and consume from topics. 
* **Producer** - Writes messages or records to the topic
* **Consumer** - Reads messages or records from the topic
* **Consumer Group** - A consumer group is a set of consumers that work together to consume data from a topic. To ensure parallelism and load balancing, each partition is assigned to at most one consumer within a group. 
    
> Across different consumer groups, the same message can be consumed multiple times




![alt text](image-2.png)


## How does it work?
When an event occurs, the **producer** creates a record and sends it to a Kafka topic.

- The producer determines the **partition**:
  - If a **key is provided** → hashing decides the partition  
  - If no key → round-robin (default)

- The producer then sends the record to the **broker that is the leader for that partition**

> Each partition has one **leader** and optional **replicas**.  
> All reads and writes go through the **leader broker**.

A Kafka record consists of:

- **Headers**: Optional metadata (similar to HTTP headers)
- **Key**: Determines partitioning (ensures ordering for the same key)
- **Value**: The payload
- **Timestamp**: Event creation or ingestion time  


> Ordering is guaranteed **only within a partition** and is based on **offsets**, not timestamps.

### Advantages of Kafka’s Append-Only Log

- **Immutability** → simplifies concurrency (no in-place updates)  
- **High throughput** - sequential disk writes are efficient  
- **Scalability** - partitions enable horizontal scaling  
- **Replayability** - consumers can re-read data using offsets  
- **Durability** - replication across brokers  


## When to use Kafka?

Kafka is best thought of as a:

> **Distributed, durable event log for real-time data streaming**

---

### ✅ Use Kafka when:

#### 1. Event-driven architecture
- Microservices communicate via events instead of direct calls  
- Decouples producers and consumers  

#### 2. High-throughput data pipelines
- Handles millions of events/sec (logs, clicks, telemetry)  
- Example: log aggregation, analytics pipelines  

#### 3. Real-time processing
- Fraud detection, monitoring, stream processing  
- Often paired with Kafka Streams / Flink  

#### 4. Data buffering / backpressure handling
- Absorbs traffic spikes between services  
- Prevents downstream overload  

#### 5. Event sourcing / audit logs
- Stores every state change as an immutable event  
- Enables replay and debugging  

#### 6. Fan-out scenarios
- Multiple consumers independently process the same data  
- Example: analytics + notifications + storage  

---

### ❌ Avoid Kafka when:

- Ultra-low latency (< few ms) is required → prefer RPC / direct APIs  
- Simple queue use-case → Kafka may be overkill  
- Small-scale systems → operational overhead is high  
- Strict global ordering is required (Kafka guarantees ordering only per partition)  


## 🔬 Deep Dive Topics (Interview Focus)

### 1. Partitioning Strategy
- Key-based partitioning  
- Hot partitions problem  
- Trade-off: ordering vs load balancing  

### 2. Replication & Fault Tolerance
- Leader and follower replicas  
- ISR (In-Sync Replicas)  
- Broker failure handling  
- Leader election  

### 3. Delivery Semantics
- At-most-once  
- At-least-once  
- Exactly-once (idempotent producers + transactions)  


### 4. Offsets & Consumer Behavior
- Offset management (auto vs manual commit)  
- Consumer rebalancing  
- Failure recovery  

### 5. Consumer Groups & Scaling
- Parallelism = number of partitions  
- Rebalancing impact  
- Partition assignment strategies  

### 6. Retention & Log Compaction
- Time-based vs size-based retention  
- Log compaction (latest value per key)  
- Use cases: changelog streams  

### 7. Producer Internals
- Batching  
- Compression  
- Acknowledgment levels (`acks=0,1,all`)  
- Idempotent producers  

### 8. Performance Tuning
- Partition count  
- Batch size / `linger.ms`  
- Throughput vs latency trade-offs  

### 9. Ordering Guarantees
- Ordering only within a partition  
- Using keys to enforce ordering  
- Trade-offs with scaling  

### 10. Exactly-Once Processing
- Idempotent producers  
- Transactions  
- End-to-end guarantees  


## 💡 Key Insight

> Kafka is not just a message queue — it is a distributed commit log that enables event streaming, replayability, and decoupled system design.


## References:
https://www.hellointerview.com/learn/system-design/deep-dives/kafka#how-kafka-works
