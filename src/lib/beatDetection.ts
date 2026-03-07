export interface Beat {
  time: number; // seconds
  strength: number; // 0-1
}

export async function detectBeats(
  audioBuffer: AudioBuffer,
  sensitivity: number = 0.5
): Promise<Beat[]> {
  const channelData = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;
  
  // Compute energy in windows
  const windowSize = Math.floor(sampleRate * 0.04); // 40ms windows
  const hopSize = Math.floor(windowSize / 2);
  const energies: number[] = [];
  
  for (let i = 0; i < channelData.length - windowSize; i += hopSize) {
    let energy = 0;
    for (let j = 0; j < windowSize; j++) {
      energy += channelData[i + j] * channelData[i + j];
    }
    energies.push(energy / windowSize);
  }
  
  // Compute onset detection function (spectral flux approximation via energy diff)
  const onsets: number[] = [];
  for (let i = 1; i < energies.length; i++) {
    const diff = energies[i] - energies[i - 1];
    onsets.push(Math.max(0, diff));
  }
  
  // Adaptive threshold
  const localWindowSize = 20;
  const threshold = (1.3 - sensitivity * 0.8); // sensitivity maps to lower threshold
  const beats: Beat[] = [];
  const minBeatInterval = 0.12; // minimum 120ms between beats
  
  let lastBeatTime = -1;
  
  for (let i = 0; i < onsets.length; i++) {
    // Local average
    const start = Math.max(0, i - localWindowSize);
    const end = Math.min(onsets.length, i + localWindowSize);
    let localAvg = 0;
    for (let j = start; j < end; j++) {
      localAvg += onsets[j];
    }
    localAvg /= (end - start);
    
    const time = ((i + 1) * hopSize) / sampleRate;
    
    if (onsets[i] > localAvg * threshold && onsets[i] > 0.0001) {
      if (time - lastBeatTime >= minBeatInterval) {
        const maxOnset = Math.max(...onsets.slice(Math.max(0, i - 5), i + 5));
        beats.push({
          time,
          strength: Math.min(1, onsets[i] / (maxOnset || 1)),
        });
        lastBeatTime = time;
      }
    }
  }
  
  return beats;
}

export function decodeAudioFile(file: File): Promise<AudioBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const ctx = new AudioContext();
        const buffer = await ctx.decodeAudioData(reader.result as ArrayBuffer);
        resolve(buffer);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
