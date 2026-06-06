
const TransactionModal = ({ status, txhash, onClose }: { status: string, txhash: string, onClose: () => void; }) => {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999,
                backgroundColor: 'rgba(0,0,0,0.15)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes checkPop {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>

            <div
                style={{
                    background: '#101010',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '2rem 1.75rem',
                    maxWidth: '360px',
                    width: '100%',
                    margin: '0 16px',
                    textAlign: 'center',
                    animation: 'fadeIn 0.25s ease',
                    boxSizing: 'border-box'
                }}
            >

                {status === 'loading' && (
                    <>
                        <div
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: '#E6F1FB',
                                border: '1.5px solid #85B7EB',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.25rem',
                            }}
                        >
                            <svg
                                width="26" height="26" viewBox="0 0 24 24"
                                fill="none" stroke="#185FA5" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round"
                                style={{ animation: 'spin 1.2s linear infinite' }}
                            >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                        </div>

                        <p style={{ fontSize: '17px', fontWeight: '600', color: '#0C447C', margin: '0 0 8px' }}>
                            Transaction in progress
                        </p>
                        <p style={{ fontSize: '14px', color: '#5F5E5A', margin: '0 0 1.5rem', lineHeight: '1.5' }}>
                            Please wait while your transaction is being processed on the blockchain.
                        </p>

                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: '7px', height: '7px',
                                        borderRadius: '50%',
                                        background: '#378ADD',
                                        animation: `bounce 1.4s ease-in-out ${delay}s infinite`
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div
                            style={{
                                width: '60px', height: '60px',
                                borderRadius: '50%',
                                background: '#EAF3DE',
                                border: '1.5px solid #97C459',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 1.25rem',
                                animation: 'checkPop 0.3s cubic-bezier(0.34,1.56,0.64,1)'
                            }}
                        >
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>

                        <p style={{ fontSize: '17px', fontWeight: '600', color: '#3B6D11', margin: '0 0 8px' }}>
                            Transaction confirmed
                        </p>
                        <p style={{ fontSize: '14px', color: '#5F5E5A', margin: '0 0 1.25rem', lineHeight: '1.5' }}>
                            Your NFT has been minted successfully.</p>

                        <a
                            href={`https://sepolia.etherscan.io/tx/${txhash}`}
                            target="_blank"
                            rel="noreferrer">
                            <div
                                style={{
                                    background: '#303030',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 14px',
                                    marginBottom: '1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textAlign: 'left'
                                }}
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c5c5c5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
                                    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
                                </svg>
                                <p
                                    style={{
                                        fontSize: '12px',
                                        color: '#c5c5c5',
                                        textDecoration: 'none',
                                        fontFamily: 'monospace',
                                        wordBreak: 'break-all',
                                        flex: 1
                                    }}
                                >
                                    {txhash?.slice(0, 14)}...{txhash?.slice(-14)}
                                </p>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c5c5c5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </div>
                        </a>

                        <button
                            className="tx-modal-close-btn"
                            onClick={onClose}
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: '#175ea3',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'opacity 0.2s'
                            }}
                        >
                            Done
                        </button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div
                            style={{
                                width: '60px', height: '60px',
                                borderRadius: '50%',
                                background: '#FCEBEB',
                                border: '1.5px solid #F09595',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 1.25rem'
                            }}
                        >
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#dd1010" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>

                        <p style={{ fontSize: '17px', fontWeight: '600', color: '#dd1010', margin: '0 0 8px' }}>
                            Transaction failed
                        </p>
                        <p style={{ fontSize: '14px', color: '#5F5E5A', margin: '0 0 1.25rem', lineHeight: '1.5' }}>
                            Something went wrong while processing your transaction. Please try again.
                        </p>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                className="tx-modal-dismiss-btn"
                                onClick={onClose}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    background: '#dd1010',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default TransactionModal;