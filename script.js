// Disk Scheduling Simulator
class DiskScheduler {
    constructor() {
        this.requests = [];
        this.currentHeadPosition = 50;
        this.selectedAlgorithm = 'fcfs';
        this.isSimulating = false;
        this.simulationSpeed = 1000; // ms
        this.totalTracks = 200; // 0-199
        this.algorithmDescriptions = {
            fcfs: "First Come First Serve (FCFS) processes requests in the order they arrive, without any optimization.",
            sstf: "Shortest Seek Time First (SSTF) selects the request with the minimum seek time from the current head position.",
            scan: "SCAN (Elevator) algorithm moves the head in one direction until it reaches the end, then reverses direction.",
            cscan: "C-SCAN (Circular SCAN) moves the head in one direction until the end, then jumps to the beginning."
        };
        this.initializeUI();
    }

    initializeUI() {
        // Algorithm selection
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.algo-btn.active').classList.remove('active');
                btn.classList.add('active');
                this.selectedAlgorithm = btn.dataset.algorithm;
                this.updateAlgorithmDescription();
            });
        });

        // Request input
        document.getElementById('add-request').addEventListener('click', () => {
            const input = document.getElementById('request-input');
            const track = parseInt(input.value);
            if (track >= 0 && track < this.totalTracks) {
                this.addRequest(track);
                input.value = '';
            } else {
                this.showNotification('Please enter a valid track number (0-199)', 'error');
            }
        });

        // Enter key for request input
        document.getElementById('request-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('add-request').click();
            }
        });

        // Simulation controls
        document.getElementById('start-simulation').addEventListener('click', () => {
            if (this.requests.length === 0) {
                this.showNotification('Please add some disk requests first', 'error');
                return;
            }
            this.startSimulation();
        });

        document.getElementById('clear-all').addEventListener('click', () => {
            this.clearAll();
        });

        // Initial head position
        document.getElementById('head-position').addEventListener('change', (e) => {
            const value = parseInt(e.target.value);
            if (value >= 0 && value < this.totalTracks) {
                this.currentHeadPosition = value;
                this.updateHeadPosition();
                document.getElementById('current-position').textContent = value;
            } else {
                this.showNotification('Please enter a valid track number (0-199)', 'error');
                e.target.value = this.currentHeadPosition;
            }
        });

        // Initialize disk visualization
        this.initializeDiskVisualization();
        this.updateAlgorithmDescription();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            ${message}
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 100);
    }

    updateAlgorithmDescription() {
        document.getElementById('algorithm-description').textContent = 
            this.algorithmDescriptions[this.selectedAlgorithm];
    }

    addRequest(track) {
        if (!this.requests.includes(track)) {
            this.requests.push(track);
            this.updateRequestsDisplay();
            this.showNotification(`Added request for track ${track}`, 'success');
        } else {
            this.showNotification(`Track ${track} is already in the request queue`, 'warning');
        }
    }

    removeRequest(track) {
        this.requests = this.requests.filter(t => t !== track);
        this.updateRequestsDisplay();
        this.showNotification(`Removed request for track ${track}`, 'info');
    }

    updateRequestsDisplay() {
        const container = document.getElementById('requests-container');
        container.innerHTML = '';
        this.requests.forEach(track => {
            const tag = document.createElement('div');
            tag.className = 'request-tag';
            tag.innerHTML = `
                <i class="fas fa-hdd"></i>
                ${track}
                <button onclick="scheduler.removeRequest(${track})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(tag);
        });
        document.getElementById('request-count').textContent = this.requests.length;
    }

    initializeDiskVisualization() {
        const diskTrack = document.getElementById('disk-track');
        const trackNumbers = document.querySelector('.track-numbers');
        
        // Create track numbers
        trackNumbers.innerHTML = `
            <span>0</span>
            <span>99</span>
            <span>199</span>
        `;

        // Create head marker
        const headMarker = document.createElement('div');
        headMarker.className = 'head-marker';
        headMarker.innerHTML = '<i class="fas fa-arrow-right"></i>';
        diskTrack.appendChild(headMarker);
        this.updateHeadPosition();
    }

    updateHeadPosition() {
        const headMarker = document.querySelector('.head-marker');
        const position = (this.currentHeadPosition / (this.totalTracks - 1)) * 100;
        headMarker.style.left = `${position}%`;
        document.getElementById('current-position').textContent = this.currentHeadPosition;
    }

    async startSimulation() {
        if (this.isSimulating) return;
        this.isSimulating = true;

        const sequence = this.getSchedulingSequence();
        let totalSeekTime = 0;
        let previousPosition = this.currentHeadPosition;

        // Disable controls during simulation
        this.toggleControls(false);

        for (let i = 0; i < sequence.length; i++) {
            const currentPosition = sequence[i];
            const seekTime = Math.abs(currentPosition - previousPosition);
            totalSeekTime += seekTime;

            // Update visualization
            this.currentHeadPosition = currentPosition;
            this.updateHeadPosition();

            // Update metrics
            document.getElementById('total-seek-time').textContent = totalSeekTime;
            document.getElementById('avg-seek-time').textContent = 
                (totalSeekTime / (i + 1)).toFixed(2);
            document.getElementById('throughput').textContent = 
                ((i + 1) / (totalSeekTime / 1000)).toFixed(2);

            // Remove processed request
            this.requests = this.requests.filter(t => t !== currentPosition);
            this.updateRequestsDisplay();

            previousPosition = currentPosition;
            await new Promise(resolve => setTimeout(resolve, this.simulationSpeed));
        }

        this.isSimulating = false;
        this.toggleControls(true);
        this.showNotification('Simulation completed!', 'success');
    }

    toggleControls(enable) {
        const controls = [
            'add-request',
            'start-simulation',
            'clear-all',
            'head-position',
            'direction'
        ];
        
        controls.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.disabled = !enable;
                element.style.opacity = enable ? '1' : '0.5';
            }
        });
    }

    getSchedulingSequence() {
        switch (this.selectedAlgorithm) {
            case 'fcfs':
                return this.fcfs();
            case 'sstf':
                return this.sstf();
            case 'scan':
                return this.scan();
            case 'cscan':
                return this.cscan();
            default:
                return [];
        }
    }

    fcfs() {
        return [...this.requests];
    }

    sstf() {
        const sequence = [];
        let remaining = [...this.requests];
        let current = this.currentHeadPosition;

        while (remaining.length > 0) {
            // Find closest request
            let closest = remaining[0];
            let minDistance = Math.abs(closest - current);

            for (let request of remaining) {
                const distance = Math.abs(request - current);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = request;
                }
            }

            sequence.push(closest);
            remaining = remaining.filter(r => r !== closest);
            current = closest;
        }

        return sequence;
    }

    scan() {
        const direction = document.getElementById('direction').value;
        const sequence = [];
        let remaining = [...this.requests].sort((a, b) => a - b);
        let current = this.currentHeadPosition;

        if (direction === 'right') {
            // Add requests in right direction
            for (let i = current; i < this.totalTracks; i++) {
                if (remaining.includes(i)) {
                    sequence.push(i);
                    remaining = remaining.filter(r => r !== i);
                }
            }

            // Add remaining requests in reverse
            for (let i = current - 1; i >= 0; i--) {
                if (remaining.includes(i)) {
                    sequence.push(i);
                    remaining = remaining.filter(r => r !== i);
                }
            }
        } else {
            // Add requests in left direction
            for (let i = current; i >= 0; i--) {
                if (remaining.includes(i)) {
                    sequence.push(i);
                    remaining = remaining.filter(r => r !== i);
                }
            }

            // Add remaining requests in reverse
            for (let i = current + 1; i < this.totalTracks; i++) {
                if (remaining.includes(i)) {
                    sequence.push(i);
                    remaining = remaining.filter(r => r !== i);
                }
            }
        }

        return sequence;
    }

    cscan() {
        const sequence = [];
        let remaining = [...this.requests].sort((a, b) => a - b);
        let current = this.currentHeadPosition;

        // Add requests in right direction
        for (let i = current; i < this.totalTracks; i++) {
            if (remaining.includes(i)) {
                sequence.push(i);
                remaining = remaining.filter(r => r !== i);
            }
        }

        // Jump to beginning and continue
        for (let i = 0; i < current; i++) {
            if (remaining.includes(i)) {
                sequence.push(i);
                remaining = remaining.filter(r => r !== i);
            }
        }

        return sequence;
    }

    clearAll() {
        this.requests = [];
        this.currentHeadPosition = 50;
        document.getElementById('head-position').value = 50;
        this.updateRequestsDisplay();
        this.updateHeadPosition();
        
        // Reset metrics
        document.getElementById('total-seek-time').textContent = '0';
        document.getElementById('avg-seek-time').textContent = '0';
        document.getElementById('throughput').textContent = '0';
        document.getElementById('request-count').textContent = '0';

        this.showNotification('All requests cleared', 'info');
    }
}

// Initialize the simulator
const scheduler = new DiskScheduler(); 