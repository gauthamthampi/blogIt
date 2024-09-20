// components/LoadingSpinner.js
export default function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader"></div>
        <style jsx>{`
          .loader {
            border: 8px solid rgba(0, 0, 0, 0.1);
            border-left-color: #3b82f6; /* Tailwind blue-500 */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
  