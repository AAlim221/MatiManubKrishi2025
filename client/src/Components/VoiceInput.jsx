import React, { useState, } from 'react';

function VoiceInput() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  let recognition;

  if ('webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'bn-BD'; // Bengali
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  }

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setListening(true);
      recognition.start();
    } else {
      alert('আপনার ব্রাউজারে ভয়েস ইনপুট সাপোর্ট নেই। অনুগ্রহ করে Google Chrome ব্যবহার করুন।');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-lg font-bold text-center text-green-700 mb-4">🎙️ বাংলা ভয়েস কমান্ড</h2>

      <button
        onClick={startListening}
        disabled={listening}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mb-4"
      >
        🎤 কথা বলুন (Bengali)
      </button>

      {transcript && (
        <div className="bg-green-50 p-4 rounded shadow border text-sm">
          <p className="text-green-700 font-semibold">📝 আপনি বললেন:</p>
          <p className="text-gray-800 mt-2">{transcript}</p>
        </div>
      )}

      {listening && <p className="text-sm text-center text-gray-500 mt-2">🎧 শুনছে...</p>}
    </div>
  );
}

export default VoiceInput;
