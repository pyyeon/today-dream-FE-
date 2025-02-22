import React, { useState, useRef } from 'react';

const PrivacyModal: React.FC<{ onClose: () => void; onAgree: () => void }> = ({ onClose, onAgree }) => {
    const [isAgreed, setIsAgreed] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const element = contentRef.current;
        if (element) {
            const { scrollTop, scrollHeight, clientHeight } = element;
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                setIsAgreed(true);
            } else {
                setIsAgreed(false);
            }
        }
    };

    const handleAgree = () => {
        if (isAgreed) {
            onAgree();
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>오늘드림 개인정보처리방침</h2>
                <div
                    className="terms-content"
                    onScroll={handleScroll}
                    ref={contentRef}
                    style={{
                        height: '200px',
                        overflowY: 'scroll',
                        padding: '10px',
                        border: '1px solid #ccc',
                        lineHeight: '1.5',
                    }}
                >
                    <p>
                        <strong>개인정보 보호정책</strong>
                        <h4>최종 업데이트: 2025년 2월 22일</h4>
                        본 개인정보 보호정책은 당사가 서비스를 이용할 때 귀하의 정보 수집, 사용 및 공개에 대한 정책과 절차를 설명합니다.

                        <h4>제1조 (개인정보의 수집)</h4>
                        당사는 다음과 같은 개인정보를 수집할 수 있습니다.<br />
                        - 이메일 주소<br />
                        - 사용 데이터(IP 주소, 브라우저 정보 등)<br />

                        <h4>제2조 (개인정보의 이용 목적)</h4>
                        - 서비스 제공 및 유지 관리<br />
                        - 고객 지원 및 문의 응답<br />
                        - 서비스 개선 및 분석<br />
                        - 보안 강화를 위한 데이터 처리<br />

                        <h4>제3조 (개인정보의 보관 및 삭제)</h4>
                        당사는 법적 의무를 준수하기 위해 필요한 기간 동안만 개인정보를 보관합니다.<br />
                        이용자는 개인정보 삭제 요청을 할 수 있으며, 계정 탈퇴 시 관련 정보가 삭제됩니다.<br />

                        <h4>제4조 (개인정보 보호 및 보안)</h4>
                        당사는 사용자의 개인정보를 보호하기 위해 보안 조치를 강화하고 있으며, 제3자에게 무단 제공하지 않습니다.

                        <h4>제5조 (개인정보의 제3자 제공)</h4>
                        - 법적 요구가 있는 경우 제공될 수 있음.<br />
                        - 사용자가 동의한 경우 제공될 수 있음.<br />

                        <h4>제6조 (문의사항)</h4>
                        개인정보 보호에 대한 문의는 아래 이메일로 가능합니다.<br />
                        📧 prkyyn@gmail.com
                    </p>
                </div>
                <div className="modal-buttons">
                    <button onClick={handleAgree} disabled={!isAgreed}>
                        동의합니다
                    </button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
