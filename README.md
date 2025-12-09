# 💿 Disk Scheduling Simulator

A powerful, interactive web-based application designed to **visualize and compare various disk scheduling algorithms** used in Operating Systems. This simulator helps users understand how different algorithms handle disk requests and optimize seek time.

> 🔍 Ideal for computer science students, operating systems learners, and educators!

---

## 📘 What is Disk Scheduling?

In an Operating System, when multiple I/O requests are sent to the hard disk, **Disk Scheduling Algorithms** decide the order in which these requests are processed.  
The goal is to:
- Minimize **seek time**
- Improve **disk throughput**
- Optimize overall **system performance**

---

## 🚀 Features of This Simulator

- ✅ Visualize multiple disk scheduling algorithms
- ✅ User-friendly controls and intuitive interface
- ✅ Real-time animation of disk head movement
- ✅ Displays total seek time, average seek time, and throughput
- ✅ Compare performance of algorithms side-by-side

---
## Key Features

- FCFS Algorithm
- SSTF Algorithm
- Visual Graph

## 📚 Algorithms Implemented

| Algorithm | Description |
|-----------|-------------|
| **FCFS** (First Come First Serve) | Services requests in the order they arrive. Simple but may cause long waits. |
| **SSTF** (Shortest Seek Time First) | Selects the request closest to the current head position. Faster, but may cause starvation. |
| **SCAN** (Elevator Algorithm) | Disk arm moves in one direction servicing all requests, then reverses. |
| **LOOK** | Similar to SCAN, but only goes as far as the last request in each direction. |
| **C-SCAN** (Circular SCAN) | Services requests in one direction, then jumps to the start without servicing while returning. |
| **C-LOOK** | Like C-SCAN but only scans up to the last request, not the full disk end. |

---

## 💻 Technologies Used

- HTML5
- CSS3
- JavaScript
- Canvas / SVG (if animations are used)
---

## 🧠 How It Works

1. **Select Algorithm**: Choose from FCFS, SSTF, SCAN, etc.
2. **Input Disk Requests**: Provide a series of disk I/O requests.
3. **Simulation Controls**: Start the simulation and watch the disk arm move.
4. **View Metrics**: Check seek time, average seek time, and throughput.
5. **Compare Algorithms**: Use the comparison view to analyze performance.

---

## 🏗️ Project Structure

```bash
📁 disk-scheduling-simulator/
│
├── index.html          # Main HTML file
├── style.css           # Styling for layout and UI
├── script.js           # Disk scheduling logic & visual simulation
├── README.md           # You're reading it!

## 📷 UI Screenshot

Here’s how the Disk Scheduling Simulator looks in action:
![Disk Scheduling Simulator UI] (screenshots)..
