---
title: "Node.js Performance: Advanced Optimization & Scalability 2025"
date: "2025-09-09"
excerpt: "Panduan mendalam optimasi performance Node.js dengan clustering, worker threads, memory management, dan best practices untuk membangun aplikasi backend yang scalable dan high-performance."
author: "Muhammad Aji Sukma"
tags: ["Node.js", "Performance", "Backend", "Scalability", "Optimization"]
image: "/images/banner.png"
---

### Artikel ini sepenuhnya ditulis oleh teknologi AI ( Claude Sonnet 4 ) dan direview Oleh Muhammad Aji Sukma

Node.js telah menjadi pilihan utama untuk backend development berkat performance yang excellent dan ecosystem yang rich. Namun, untuk mencapai performance optimal di production, kita perlu memahami internal Node.js dan menerapkan optimization techniques yang tepat. Mari kita explore advanced optimization strategies untuk 2025.

## 🎯 Understanding Node.js Performance Fundamentals

### Event Loop & Non-Blocking I/O

Node.js menggunakan single-threaded event loop yang membuat I/O operations menjadi non-blocking dan sangat efficient.

```javascript
// Understanding Event Loop Phases
const fs = require("fs").promises;
const { performance } = require("perf_hooks");

// Demonstrasi Event Loop phases
async function demonstrateEventLoop() {
  console.log("=== Event Loop Demo ===");

  // 1. Timer phase
  setTimeout(() => console.log("Timer: setTimeout"), 0);
  setImmediate(() => console.log("Check: setImmediate"));

  // 2. Poll phase - I/O operations
  process.nextTick(() => console.log("NextTick: priority 1"));
  Promise.resolve().then(() => console.log("Promise: microtask"));

  // 3. File I/O (thread pool)
  try {
    const startTime = performance.now();
    await fs.readFile("large-file.txt");
    console.log(`File read took: ${performance.now() - startTime}ms`);
  } catch (error) {
    console.log("File not found, continuing...");
  }

  // 4. More microtasks
  process.nextTick(() => console.log("NextTick: priority 2"));
  Promise.resolve().then(() => console.log("Promise: microtask 2"));
}

demonstrateEventLoop();

// Output menunjukkan urutan eksekusi berdasarkan Event Loop phases:
// NextTick: priority 1
// Promise: microtask
// NextTick: priority 2
// Promise: microtask 2
// Timer: setTimeout
// Check: setImmediate
// File read took: Xms
```

### Memory Management & Garbage Collection

```javascript
// Memory monitoring and optimization
const v8 = require("v8");
const { performance, PerformanceObserver } = require("perf_hooks");

class MemoryMonitor {
  constructor() {
    this.gcObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log(`GC ${entry.kind}: ${entry.duration}ms`);
      });
    });

    this.gcObserver.observe({ entryTypes: ["gc"] });
  }

  getMemoryUsage() {
    const memUsage = process.memoryUsage();
    const heapStats = v8.getHeapStatistics();

    return {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
      external: `${Math.round(memUsage.external / 1024 / 1024)} MB`,
      heapLimit: `${Math.round(heapStats.heap_size_limit / 1024 / 1024)} MB`,
      heapAvailable: `${Math.round(
        (heapStats.heap_size_limit - heapStats.used_heap_size) / 1024 / 1024
      )} MB`,
    };
  }

  logMemoryUsage() {
    const usage = this.getMemoryUsage();
    console.log("Memory Usage:", usage);
  }

  // Force garbage collection (hanya untuk development)
  forceGC() {
    if (global.gc) {
      const before = process.memoryUsage().heapUsed;
      global.gc();
      const after = process.memoryUsage().heapUsed;
      console.log(`GC freed: ${Math.round((before - after) / 1024 / 1024)} MB`);
    }
  }

  // Memory leak detection
  detectMemoryLeaks() {
    const snapshots = [];
    const interval = setInterval(() => {
      const usage = process.memoryUsage();
      snapshots.push(usage.heapUsed);

      if (snapshots.length > 10) {
        const trend = this.calculateTrend(snapshots.slice(-10));
        if (trend > 0.1) {
          // 10% increase trend
          console.warn("Potential memory leak detected!", {
            trend: `${(trend * 100).toFixed(2)}%`,
            currentHeap: `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
          });
        }
        snapshots.shift(); // Keep only last 10 snapshots
      }
    }, 5000);

    // Cleanup after 5 minutes
    setTimeout(() => clearInterval(interval), 300000);
  }

  calculateTrend(values) {
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, i) => sum + i * val, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const mean = sumY / n;

    return slope / mean; // Normalized slope
  }
}

const memoryMonitor = new MemoryMonitor();
memoryMonitor.detectMemoryLeaks();

// Monitor setiap 30 detik
setInterval(() => {
  memoryMonitor.logMemoryUsage();
}, 30000);
```

## 🚀 Clustering untuk Multi-Core Utilization

### Master-Worker Architecture

```javascript
// cluster-master.js
const cluster = require("cluster");
const os = require("os");
const path = require("path");

class ClusterManager {
  constructor(options = {}) {
    this.numCPUs = options.workers || os.cpus().length;
    this.workerFile = options.workerFile || "./app.js";
    this.gracefulTimeout = options.gracefulTimeout || 30000;
    this.workers = new Map();
    this.isShuttingDown = false;
  }

  start() {
    if (cluster.isMaster) {
      this.startMaster();
    } else {
      this.startWorker();
    }
  }

  startMaster() {
    console.log(`Master ${process.pid} is running`);
    console.log(`Starting ${this.numCPUs} workers...`);

    // Fork workers
    for (let i = 0; i < this.numCPUs; i++) {
      this.forkWorker();
    }

    // Handle worker events
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
      this.workers.delete(worker.id);

      // Restart worker if not shutting down
      if (!this.isShuttingDown) {
        console.log("Starting a new worker");
        this.forkWorker();
      }
    });

    cluster.on("online", (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => this.gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => this.gracefulShutdown("SIGINT"));

    // Worker health monitoring
    this.startHealthMonitoring();

    // Memory monitoring for master process
    this.startMemoryMonitoring();
  }

  forkWorker() {
    const worker = cluster.fork();
    this.workers.set(worker.id, {
      worker,
      startTime: Date.now(),
      requests: 0,
      errors: 0,
    });

    // Worker message handling
    worker.on("message", (msg) => {
      this.handleWorkerMessage(worker.id, msg);
    });

    return worker;
  }

  handleWorkerMessage(workerId, message) {
    const workerData = this.workers.get(workerId);
    if (!workerData) return;

    switch (message.type) {
      case "request":
        workerData.requests++;
        break;
      case "error":
        workerData.errors++;
        console.error(`Worker ${workerId} error:`, message.error);
        break;
      case "metrics":
        this.updateWorkerMetrics(workerId, message.data);
        break;
    }
  }

  startHealthMonitoring() {
    setInterval(() => {
      this.workers.forEach((data, workerId) => {
        const { worker, startTime, requests, errors } = data;
        const uptime = Date.now() - startTime;
        const errorRate = errors / (requests || 1);

        console.log(`Worker ${workerId} stats:`, {
          pid: worker.process.pid,
          uptime: `${Math.round(uptime / 1000)}s`,
          requests,
          errors,
          errorRate: `${(errorRate * 100).toFixed(2)}%`,
        });

        // Restart unhealthy workers
        if (errorRate > 0.1 && requests > 100) {
          // 10% error rate
          console.warn(`Restarting unhealthy worker ${workerId}`);
          this.restartWorker(workerId);
        }
      });
    }, 60000); // Every minute
  }

  restartWorker(workerId) {
    const workerData = this.workers.get(workerId);
    if (workerData) {
      workerData.worker.kill("SIGTERM");
      // New worker akan di-spawn otomatis oleh exit event handler
    }
  }

  async gracefulShutdown(signal) {
    console.log(`Received ${signal}, starting graceful shutdown...`);
    this.isShuttingDown = true;

    // Stop accepting new connections
    this.workers.forEach((data) => {
      data.worker.send({ type: "shutdown" });
    });

    // Give workers time untuk graceful shutdown
    await new Promise((resolve) => {
      const shutdownTimer = setTimeout(() => {
        console.log("Forcing worker shutdown...");
        this.workers.forEach((data) => {
          data.worker.kill("SIGKILL");
        });
        resolve();
      }, this.gracefulTimeout);

      // Check if all workers exited gracefully
      const checkInterval = setInterval(() => {
        if (this.workers.size === 0) {
          clearTimeout(shutdownTimer);
          clearInterval(checkInterval);
          resolve();
        }
      }, 1000);
    });

    console.log("All workers shut down gracefully");
    process.exit(0);
  }

  startMemoryMonitoring() {
    const v8 = require("v8");

    setInterval(() => {
      const memUsage = process.memoryUsage();
      const heapStats = v8.getHeapStatistics();

      console.log("Master process memory:", {
        rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
        workers: this.workers.size,
      });
    }, 30000);
  }

  startWorker() {
    require(path.resolve(this.workerFile));
  }
}

// Usage
const clusterManager = new ClusterManager({
  workers: 4, // atau os.cpus().length
  workerFile: "./app.js",
  gracefulTimeout: 30000,
});

clusterManager.start();
```

### Worker Process Implementation

```javascript
// app.js - Worker process
const express = require("express");
const { performance, PerformanceObserver } = require("perf_hooks");

class WorkerApp {
  constructor() {
    this.app = express();
    this.server = null;
    this.requestCount = 0;
    this.errorCount = 0;
    this.startTime = Date.now();

    this.setupMiddleware();
    this.setupRoutes();
    this.setupPerformanceMonitoring();
    this.setupGracefulShutdown();
  }

  setupMiddleware() {
    // Request counting middleware
    this.app.use((req, res, next) => {
      this.requestCount++;

      // Notify master process
      if (process.send) {
        process.send({ type: "request" });
      }

      // Performance monitoring
      const start = performance.now();
      res.on("finish", () => {
        const duration = performance.now() - start;
        if (duration > 1000) {
          // Log slow requests
          console.warn(`Slow request: ${req.method} ${req.path} - ${duration}ms`);
        }
      });

      next();
    });

    // Error handling middleware
    this.app.use((err, req, res, next) => {
      this.errorCount++;

      if (process.send) {
        process.send({
          type: "error",
          error: {
            message: err.message,
            stack: err.stack,
            url: req.url,
            method: req.method,
          },
        });
      }

      console.error("Request error:", err);
      res.status(500).json({ error: "Internal server error" });
    });

    // Response time monitoring
    this.app.use((req, res, next) => {
      const start = Date.now();
      res.on("finish", () => {
        const responseTime = Date.now() - start;
        res.set("X-Response-Time", `${responseTime}ms`);
      });
      next();
    });
  }

  setupRoutes() {
    // Health check endpoint
    this.app.get("/health", (req, res) => {
      const memUsage = process.memoryUsage();
      res.json({
        status: "healthy",
        pid: process.pid,
        uptime: Date.now() - this.startTime,
        requests: this.requestCount,
        errors: this.errorCount,
        memory: {
          rss: Math.round(memUsage.rss / 1024 / 1024),
          heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
          heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
        },
      });
    });

    // CPU intensive task (untuk testing)
    this.app.get("/cpu-intensive", (req, res) => {
      const start = Date.now();
      let result = 0;

      // Simulate CPU intensive task
      for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
      }

      res.json({
        result: result,
        duration: Date.now() - start,
        worker: process.pid,
      });
    });

    // Memory intensive task (untuk testing)
    this.app.get("/memory-intensive", (req, res) => {
      const size = parseInt(req.query.size) || 1000000;
      const largeArray = new Array(size).fill().map((_, i) => ({
        id: i,
        data: Math.random().toString(36).repeat(10),
      }));

      // Simulate processing
      const processed = largeArray.map((item) => ({
        ...item,
        processed: true,
        timestamp: Date.now(),
      }));

      res.json({
        count: processed.length,
        sample: processed.slice(0, 5),
        worker: process.pid,
      });
    });

    // Database simulation (I/O intensive)
    this.app.get("/db-simulation", async (req, res) => {
      try {
        // Simulate multiple database calls
        const queries = Array(5)
          .fill()
          .map(() => this.simulateDbQuery());
        const results = await Promise.all(queries);

        res.json({
          results: results,
          worker: process.pid,
        });
      } catch (error) {
        next(error);
      }
    });
  }

  async simulateDbQuery() {
    return new Promise((resolve) => {
      // Simulate database latency
      setTimeout(() => {
        resolve({
          id: Math.floor(Math.random() * 1000),
          data: Math.random().toString(36).repeat(20),
          timestamp: new Date().toISOString(),
        });
      }, Math.random() * 100 + 50); // 50-150ms latency
    });
  }

  setupPerformanceMonitoring() {
    // Performance observer untuk monitoring
    const perfObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 100) {
          // Log operations > 100ms
          console.log(`Slow operation: ${entry.name} - ${entry.duration}ms`);
        }
      });
    });

    perfObserver.observe({ entryTypes: ["measure", "navigation", "mark"] });

    // Report metrics ke master process
    setInterval(() => {
      if (process.send) {
        const memUsage = process.memoryUsage();
        process.send({
          type: "metrics",
          data: {
            requests: this.requestCount,
            errors: this.errorCount,
            uptime: Date.now() - this.startTime,
            memory: {
              rss: memUsage.rss,
              heapUsed: memUsage.heapUsed,
              heapTotal: memUsage.heapTotal,
            },
          },
        });
      }
    }, 30000);
  }

  setupGracefulShutdown() {
    // Handle shutdown message from master
    process.on("message", (msg) => {
      if (msg.type === "shutdown") {
        this.gracefulShutdown();
      }
    });

    // Handle direct signals
    process.on("SIGTERM", () => this.gracefulShutdown());
    process.on("SIGINT", () => this.gracefulShutdown());
  }

  async gracefulShutdown() {
    console.log(`Worker ${process.pid} shutting down gracefully...`);

    if (this.server) {
      this.server.close(async (err) => {
        if (err) {
          console.error("Error during server shutdown:", err);
        }

        // Wait for ongoing requests to complete
        await new Promise((resolve) => setTimeout(resolve, 5000));

        console.log(`Worker ${process.pid} shut down complete`);
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  }

  start(port = 3000) {
    this.server = this.app.listen(port, () => {
      console.log(`Worker ${process.pid} listening on port ${port}`);
    });

    // Handle server errors
    this.server.on("error", (err) => {
      console.error("Server error:", err);
      if (process.send) {
        process.send({ type: "error", error: err.message });
      }
    });

    return this.server;
  }
}

// Start worker
const workerApp = new WorkerApp();
workerApp.start(process.env.PORT || 3000);
```

## 🧵 Worker Threads untuk CPU-Intensive Tasks

### Worker Thread Pool Implementation

```javascript
// worker-thread-pool.js
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const { performance } = require("perf_hooks");

class WorkerThreadPool {
  constructor(poolSize = require("os").cpus().length) {
    this.poolSize = poolSize;
    this.workers = [];
    this.queue = [];
    this.activeJobs = new Map();
    this.jobId = 0;

    this.initializeWorkers();
  }

  initializeWorkers() {
    for (let i = 0; i < this.poolSize; i++) {
      this.createWorker();
    }
  }

  createWorker() {
    const worker = new Worker(__filename, {
      workerData: { isWorkerThread: true },
    });

    worker.isAvailable = true;
    worker.currentJob = null;

    worker.on("message", (result) => {
      const job = this.activeJobs.get(result.jobId);
      if (job) {
        job.resolve(result);
        this.activeJobs.delete(result.jobId);
      }

      worker.isAvailable = true;
      worker.currentJob = null;
      this.processQueue();
    });

    worker.on("error", (error) => {
      console.error("Worker error:", error);
      const jobId = worker.currentJob;
      if (jobId) {
        const job = this.activeJobs.get(jobId);
        if (job) {
          job.reject(error);
          this.activeJobs.delete(jobId);
        }
      }

      // Replace failed worker
      this.replaceWorker(worker);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
        this.replaceWorker(worker);
      }
    });

    this.workers.push(worker);
  }

  replaceWorker(oldWorker) {
    const index = this.workers.indexOf(oldWorker);
    if (index !== -1) {
      this.workers.splice(index, 1);
      this.createWorker();
    }
  }

  execute(taskType, data) {
    return new Promise((resolve, reject) => {
      const jobId = this.jobId++;
      const job = {
        jobId,
        taskType,
        data,
        resolve,
        reject,
        timestamp: Date.now(),
      };

      this.activeJobs.set(jobId, job);
      this.queue.push(job);
      this.processQueue();
    });
  }

  processQueue() {
    if (this.queue.length === 0) return;

    const availableWorker = this.workers.find((worker) => worker.isAvailable);
    if (!availableWorker) return;

    const job = this.queue.shift();
    availableWorker.isAvailable = false;
    availableWorker.currentJob = job.jobId;

    availableWorker.postMessage({
      jobId: job.jobId,
      taskType: job.taskType,
      data: job.data,
    });
  }

  getStatus() {
    return {
      poolSize: this.poolSize,
      availableWorkers: this.workers.filter((w) => w.isAvailable).length,
      queueLength: this.queue.length,
      activeJobs: this.activeJobs.size,
      workers: this.workers.map((worker, index) => ({
        id: index,
        available: worker.isAvailable,
        currentJob: worker.currentJob,
      })),
    };
  }

  async shutdown() {
    console.log("Shutting down worker thread pool...");

    // Wait untuk active jobs selesai
    while (this.activeJobs.size > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Terminate semua workers
    await Promise.all(
      this.workers.map((worker) => {
        return new Promise((resolve) => {
          worker.terminate().then(resolve);
        });
      })
    );

    console.log("Worker thread pool shut down complete");
  }
}

// Worker thread implementation
if (!isMainThread && workerData?.isWorkerThread) {
  // CPU intensive tasks
  const tasks = {
    fibonacci: (n) => {
      if (n < 2) return n;
      return tasks.fibonacci(n - 1) + tasks.fibonacci(n - 2);
    },

    primeNumbers: (limit) => {
      const primes = [];
      const sieve = new Array(limit + 1).fill(true);
      sieve[0] = sieve[1] = false;

      for (let i = 2; i * i <= limit; i++) {
        if (sieve[i]) {
          for (let j = i * i; j <= limit; j += i) {
            sieve[j] = false;
          }
        }
      }

      for (let i = 2; i <= limit; i++) {
        if (sieve[i]) primes.push(i);
      }

      return primes;
    },

    matrixMultiply: ({ matrixA, matrixB }) => {
      const rowsA = matrixA.length;
      const colsA = matrixA[0].length;
      const colsB = matrixB[0].length;

      const result = Array(rowsA)
        .fill()
        .map(() => Array(colsB).fill(0));

      for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
          for (let k = 0; k < colsA; k++) {
            result[i][j] += matrixA[i][k] * matrixB[k][j];
          }
        }
      }

      return result;
    },

    imageProcessing: (imageData) => {
      // Simulate image processing (blur effect)
      const { width, height, pixels } = imageData;
      const processed = new Array(pixels.length);

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const idx = i * width + j;
          let sum = 0,
            count = 0;

          // 3x3 kernel blur
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;

              if (ni >= 0 && ni < height && nj >= 0 && nj < width) {
                sum += pixels[ni * width + nj];
                count++;
              }
            }
          }

          processed[idx] = Math.round(sum / count);
        }
      }

      return { width, height, pixels: processed };
    },
  };

  parentPort.on("message", ({ jobId, taskType, data }) => {
    try {
      const startTime = performance.now();
      const result = tasks[taskType](data);
      const duration = performance.now() - startTime;

      parentPort.postMessage({
        jobId,
        success: true,
        result,
        duration,
        worker: process.pid,
      });
    } catch (error) {
      parentPort.postMessage({
        jobId,
        success: false,
        error: error.message,
        worker: process.pid,
      });
    }
  });
}

module.exports = WorkerThreadPool;

// Usage example in Express app
const express = require("express");
const WorkerThreadPool = require("./worker-thread-pool");

const app = express();
const workerPool = new WorkerThreadPool(4);

app.use(express.json());

// CPU intensive endpoints
app.get("/fibonacci/:n", async (req, res) => {
  try {
    const n = parseInt(req.params.n);
    if (n > 45) {
      return res.status(400).json({ error: "Number too large (max 45)" });
    }

    const result = await workerPool.execute("fibonacci", n);
    res.json({
      n,
      fibonacci: result.result,
      duration: result.duration,
      worker: result.worker,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/primes/:limit", async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    if (limit > 1000000) {
      return res.status(400).json({ error: "Limit too large (max 1,000,000)" });
    }

    const result = await workerPool.execute("primeNumbers", limit);
    res.json({
      limit,
      count: result.result.length,
      primes: result.result.slice(0, 100), // First 100 primes
      duration: result.duration,
      worker: result.worker,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/matrix-multiply", async (req, res) => {
  try {
    const { matrixA, matrixB } = req.body;

    // Validation
    if (!matrixA || !matrixB || !Array.isArray(matrixA) || !Array.isArray(matrixB)) {
      return res.status(400).json({ error: "Invalid matrices" });
    }

    const result = await workerPool.execute("matrixMultiply", { matrixA, matrixB });
    res.json({
      result: result.result,
      duration: result.duration,
      worker: result.worker,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pool status endpoint
app.get("/worker-status", (req, res) => {
  res.json(workerPool.getStatus());
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("Shutting down...");
  await workerPool.shutdown();
  process.exit(0);
});

if (isMainThread) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Worker thread pool initialized with ${workerPool.poolSize} workers`);
  });
}
```

## 💾 Database Performance Optimization

### Connection Pooling & Query Optimization

```javascript
// database-manager.js
const { Pool } = require("pg");
const { performance } = require("perf_hooks");

class DatabaseManager {
  constructor(config = {}) {
    this.pool = new Pool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || "myapp",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "password",

      // Connection pool settings
      min: config.minConnections || 5,
      max: config.maxConnections || 20,
      idleTimeoutMillis: config.idleTimeout || 30000,
      connectionTimeoutMillis: config.connectionTimeout || 2000,

      // Performance settings
      statement_timeout: config.statementTimeout || 30000,
      query_timeout: config.queryTimeout || 30000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 0,
    });

    this.queryStats = new Map();
    this.slowQueries = [];
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.pool.on("connect", (client) => {
      console.log("New database connection established");
    });

    this.pool.on("error", (err, client) => {
      console.error("Database pool error:", err);
    });

    this.pool.on("remove", (client) => {
      console.log("Database connection removed from pool");
    });

    // Monitor pool status
    setInterval(() => {
      const { totalCount, idleCount, waitingCount } = this.pool;
      console.log("Pool status:", {
        total: totalCount,
        idle: idleCount,
        waiting: waitingCount,
        active: totalCount - idleCount,
      });
    }, 60000);
  }

  async query(text, params = [], options = {}) {
    const start = performance.now();
    const queryId = this.generateQueryId(text);

    try {
      // Get connection from pool
      const client = await this.pool.connect();

      try {
        // Execute query dengan performance monitoring
        const result = await client.query(text, params);
        const duration = performance.now() - start;

        // Track query statistics
        this.trackQueryStats(queryId, text, duration, result.rowCount);

        // Log slow queries
        if (duration > (options.slowQueryThreshold || 1000)) {
          this.logSlowQuery(text, params, duration);
        }

        return result;
      } finally {
        // Always release connection back to pool
        client.release();
      }
    } catch (error) {
      const duration = performance.now() - start;
      this.trackQueryError(queryId, text, duration, error);
      throw error;
    }
  }

  // Prepared statement untuk query yang sering digunakan
  async createPreparedStatement(name, text) {
    const client = await this.pool.connect();
    try {
      await client.query(`PREPARE ${name} AS ${text}`);
      console.log(`Prepared statement '${name}' created`);
    } finally {
      client.release();
    }
  }

  async executePrepared(name, params = []) {
    const start = performance.now();

    try {
      const client = await this.pool.connect();
      try {
        const result = await client.query(
          `EXECUTE ${name}(${params.map((_, i) => `$${i + 1}`).join(", ")})`,
          params
        );
        const duration = performance.now() - start;

        this.trackQueryStats(`prepared_${name}`, `EXECUTE ${name}`, duration, result.rowCount);
        return result;
      } finally {
        client.release();
      }
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`Prepared statement error: ${name}`, error);
      throw error;
    }
  }

  // Transaction management dengan retry logic
  async transaction(callback, options = {}) {
    const maxRetries = options.maxRetries || 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      const client = await this.pool.connect();

      try {
        await client.query("BEGIN");

        const result = await callback(client);

        await client.query("COMMIT");
        return result;
      } catch (error) {
        await client.query("ROLLBACK");

        // Retry untuk serialization failures
        if (error.code === "40001" && attempt < maxRetries - 1) {
          attempt++;
          console.warn(`Transaction retry ${attempt}/${maxRetries}:`, error.message);
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 100));
          continue;
        }

        throw error;
      } finally {
        client.release();
      }
    }
  }

  // Bulk insert untuk performance yang lebih baik
  async bulkInsert(table, columns, rows, options = {}) {
    if (rows.length === 0) return;

    const chunkSize = options.chunkSize || 1000;
    const results = [];

    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const values = chunk
        .map(
          (row, rowIndex) =>
            `(${columns
              .map((_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`)
              .join(", ")})`
        )
        .join(", ");

      const query = `INSERT INTO ${table} (${columns.join(", ")}) VALUES ${values}`;
      const params = chunk.flat();

      const result = await this.query(query, params);
      results.push(result);
    }

    return results;
  }

  // Query dengan caching
  async queryWithCache(text, params = [], cacheKey, ttl = 300000) {
    // 5 minutes default
    const cached = this.cache?.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }

    const result = await this.query(text, params);

    if (this.cache) {
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });
    }

    return result;
  }

  generateQueryId(text) {
    // Simple hash function untuk query identification
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  trackQueryStats(queryId, text, duration, rowCount) {
    if (!this.queryStats.has(queryId)) {
      this.queryStats.set(queryId, {
        query: text.substring(0, 100) + (text.length > 100 ? "..." : ""),
        count: 0,
        totalDuration: 0,
        avgDuration: 0,
        minDuration: Infinity,
        maxDuration: 0,
        totalRows: 0,
      });
    }

    const stats = this.queryStats.get(queryId);
    stats.count++;
    stats.totalDuration += duration;
    stats.avgDuration = stats.totalDuration / stats.count;
    stats.minDuration = Math.min(stats.minDuration, duration);
    stats.maxDuration = Math.max(stats.maxDuration, duration);
    stats.totalRows += rowCount || 0;
  }

  trackQueryError(queryId, text, duration, error) {
    console.error("Query error:", {
      queryId,
      query: text.substring(0, 100),
      duration,
      error: error.message,
    });
  }

  logSlowQuery(text, params, duration) {
    const slowQuery = {
      query: text,
      params,
      duration,
      timestamp: new Date().toISOString(),
    };

    this.slowQueries.push(slowQuery);

    // Keep only last 100 slow queries
    if (this.slowQueries.length > 100) {
      this.slowQueries.shift();
    }

    console.warn("Slow query detected:", {
      duration: `${duration}ms`,
      query: text.substring(0, 200),
    });
  }

  getStatistics() {
    const queries = Array.from(this.queryStats.values())
      .sort((a, b) => b.totalDuration - a.totalDuration)
      .slice(0, 10);

    return {
      pool: {
        totalCount: this.pool.totalCount,
        idleCount: this.pool.idleCount,
        waitingCount: this.pool.waitingCount,
      },
      topQueries: queries,
      slowQueries: this.slowQueries.slice(-10),
      totalQueries: Array.from(this.queryStats.values()).reduce((sum, stat) => sum + stat.count, 0),
    };
  }

  async close() {
    console.log("Closing database pool...");
    await this.pool.end();
    console.log("Database pool closed");
  }
}

module.exports = DatabaseManager;
```

## 🌟 Kesimpulan

Node.js performance optimization memerlukan pemahaman mendalam tentang internal Node.js dan penerapan best practices yang tepat. Dengan menguasai:

**Core Performance Concepts:**

- ✅ **Event Loop** understanding dan optimization
- ✅ **Memory Management** dan garbage collection
- ✅ **CPU Profiling** dan bottleneck identification
- ✅ **I/O Optimization** dengan proper async patterns

**Scalability Strategies:**

- ✅ **Clustering** untuk multi-core utilization
- ✅ **Worker Threads** untuk CPU-intensive tasks
- ✅ **Load Balancing** dan horizontal scaling
- ✅ **Microservices Architecture** untuk large applications

**Database Performance:**

- ✅ **Connection Pooling** yang optimal
- ✅ **Query Optimization** dan prepared statements
- ✅ **Transaction Management** dengan retry logic
- ✅ **Bulk Operations** untuk better throughput

**Monitoring & Debugging:**

- ✅ **Performance Metrics** collection
- ✅ **Memory Leak Detection** automated
- ✅ **Slow Query Logging** dan analysis
- ✅ **Health Checks** yang comprehensive

Node.js memberikan foundation yang excellent untuk high-performance applications, namun memerlukan careful optimization untuk mencapai scalability maksimal di production environment.

**Pro Tips:**

- Always profile sebelum optimize
- Use clustering untuk CPU-bound applications
- Implement proper error handling dan graceful shutdown
- Monitor memory usage dan detect leaks early
- Use worker threads untuk blocking operations

Happy optimizing with Node.js! 🚀
