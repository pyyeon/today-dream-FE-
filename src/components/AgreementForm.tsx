import React, { useState } from 'react';
import TermsModal from './TermsModal.tsx'; 
import PrivacyModal from './PrivacyModal.tsx';  


const AgreementForm: React.FC<{ onAgree: (termsAgreed: boolean, privacyAgreed: boolean) => void }> = ({ onAgree }) => {
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const handleFinalAgree = () => {
        if (termsAgreed && privacyAgreed) {
            onAgree(termsAgreed, privacyAgreed);
        }
    };

    return (
        <div className="agreement-container">
            <h2>서비스 이용을 위해 약관에 동의해주세요</h2>

            <div className="checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={termsAgreed}
                        onChange={(e) => setTermsAgreed(e.target.checked)}
                    />
                    <span onClick={() => setShowTerms(true)}> [필수] 이용약관 동의</span>
                </label>
            </div>

            <div className="checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={privacyAgreed}
                        onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    />
                    <span onClick={() => setShowPrivacy(true)}> [필수] 개인정보처리방침 동의</span>
                </label>
            </div>

            <button onClick={handleFinalAgree} disabled={!termsAgreed || !privacyAgreed}>
                동의하고 계속하기
            </button>

            {showTerms && <TermsModal onClose={() => setShowTerms(false)} onAgree={() => setTermsAgreed(true)} />}
            {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} onAgree={() => setPrivacyAgreed(true)} />}
        </div>
    );
};

export default AgreementForm;
