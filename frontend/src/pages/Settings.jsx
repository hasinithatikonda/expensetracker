import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Key, Save, Eye, EyeOff, Info } from 'lucide-react';

function Settings() {
  const [apiKeys, setApiKeys] = useState({
    openaiKey: '',
    groqKey: ''
  });
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showGroq, setShowGroq] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentKeys, setCurrentKeys] = useState({
    hasOpenAI: false,
    hasGroq: false
  });

  useEffect(() => {
    checkCurrentKeys();
  }, []);

  const checkCurrentKeys = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/settings/api-keys`);
      setCurrentKeys(response.data);
    } catch (error) {
      console.error('Error checking API keys:', error);
    }
  };

  const handleSave = async () => {
    if (!apiKeys.openaiKey && !apiKeys.groqKey) {
      toast.error('Please enter at least one API key');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/settings/api-keys`,
        apiKeys
      );

      toast.success(response.data.message || 'API keys saved successfully!');
      setApiKeys({ openaiKey: '', groqKey: '' });
      checkCurrentKeys();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save API keys');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your AI API keys for receipt scanning</p>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Current API Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Key className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium">OpenAI API</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentKeys.hasOpenAI 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {currentKeys.hasOpenAI ? '✓ Configured' : '○ Not Set'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Key className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium">Groq API</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentKeys.hasGroq 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {currentKeys.hasGroq ? '✓ Configured' : '○ Not Set'}
            </span>
          </div>
        </div>
      </div>

      {/* API Key Configuration */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Configure API Keys</h2>
        
        <div className="space-y-6">
          {/* OpenAI API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OpenAI API Key (Recommended)
            </label>
            <div className="relative">
              <input
                type={showOpenAI ? 'text' : 'password'}
                value={apiKeys.openaiKey}
                onChange={(e) => setApiKeys({ ...apiKeys, openaiKey: e.target.value })}
                placeholder="sk-proj-..."
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowOpenAI(!showOpenAI)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showOpenAI ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="mt-2 flex items-start space-x-2 text-sm text-gray-600">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p>Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">platform.openai.com/api-keys</a></p>
                <p className="text-xs mt-1">Cost: ~$0.00015 per receipt scan. Requires billing setup.</p>
              </div>
            </div>
          </div>

          {/* Groq API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Groq API Key (Alternative)
            </label>
            <div className="relative">
              <input
                type={showGroq ? 'text' : 'password'}
                value={apiKeys.groqKey}
                onChange={(e) => setApiKeys({ ...apiKeys, groqKey: e.target.value })}
                placeholder="gsk_..."
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowGroq(!showGroq)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showGroq ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="mt-2 flex items-start space-x-2 text-sm text-gray-600">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p>Get your API key from <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">console.groq.com</a></p>
                <p className="text-xs mt-1 text-yellow-600">⚠️ Note: Groq vision models are currently deprecated. OpenAI is recommended.</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading || (!apiKeys.openaiKey && !apiKeys.groqKey)}
            className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              'Saving...'
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save API Keys
              </>
            )}
          </button>
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">About AI Receipt Scanning</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• <strong>OpenAI (Recommended):</strong> Most accurate, requires billing (~$0.00015/scan)</p>
          <p>• <strong>Groq:</strong> Free but vision models are deprecated</p>
          <p>• <strong>Manual Entry:</strong> Always available, no API key needed</p>
          <p className="mt-3 text-blue-700">
            💡 <strong>Tip:</strong> Manual entry is fast and free! AI scanning is optional.
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-1">Security & Privacy</p>
            <p>Your API keys are stored securely in the backend environment and are never exposed to the frontend. Keys are encrypted and only used for processing your receipt uploads.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
