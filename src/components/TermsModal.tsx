import React, { useState, useRef } from 'react';

const TermsModal: React.FC<{ onClose: () => void; onAgree: () => void; }> = ({ onClose, onAgree }) => {
    const [isAgreed, setIsAgreed] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const element = contentRef.current;
        if (element) {
            const { scrollTop, scrollHeight, clientHeight } = element;
            // 스크롤이 끝까지 도달했는지 확인
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                setIsAgreed(true);
            }else {
                setIsAgreed(false); // 스크롤이 끝에 도달하지 않으면 다시 false로 설정
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
                <h2>오늘드림 이용약관</h2>
                <div
                    className="terms-content"
                    onScroll={handleScroll}
                    ref={contentRef}
                    style={{ height: '200px', overflowY: 'scroll', padding: '10px', border: '1px solid #ccc' }}
                >
                    <p>
                        이용약관
                        <h4>제1조 (목적)</h4>

                        이 약관은 [서비스명] (이하 "서비스")를 제공하는 [회사명] (이하 "회사")과 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

                        <h4>제2조 (정의)</h4>

                        "이용자"란 회사의 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 의미합니다.
                        "회원"이란 회사와 서비스 이용 계약을 체결하고, 서비스에 등록한 이용자를 의미합니다.
                        "비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.
                        <h4>제3조 (약관의 효력 및 변경)</h4>

                        이 약관은 서비스를 이용하고자 하는 모든 이용자에게 공지함으로써 효력을 발생합니다.
                        회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 공지 후 효력이 발생합니다.
                        <h4>제4조 (서비스의 제공 및 변경)</h4>

                        회사는 다음과 같은 서비스를 제공합니다:
                        정보 제공 서비스
                        커뮤니티 서비스
                        기타 회사가 정하는 서비스
                        회사는 서비스의 내용을 변경할 수 있으며, 이 경우 변경 사항을 사전에 공지합니다.
                        <h4>제5조 (회원가입 및 탈퇴)</h4>

                        이용자는 회사가 정한 가입 양식에 따라 회원가입을 요청할 수 있습니다.
                        회원가입은 회사의 승낙으로 완료되며, 회원은 언제든지 탈퇴할 수 있습니다.
                        <h4>제6조 (이용자의 의무)</h4>

                        이용자는 서비스 이용 시 다음의 행위를 하여서는 안 됩니다:
                        타인의 개인정보 도용
                        서비스의 안정적인 운영 방해
                        불법적인 목적으로 서비스 이용
                        이용자는 서비스 이용 시 법령 및 이 약관을 준수하여야 하며, 위반 시 모든 책임을 집니다.
                        <h4>제7조 (개인정보 보호)</h4>

                        회사는 이용자의 개인정보를 보호하기 위해 최선을 다하며, 개인정보 처리 방침에 따라 이용자의 정보를 보호합니다.

                        <h4>제8조 (면책조항)</h4>

                        회사는 천재지변, 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.
                        회사는 이용자가 서비스 이용 시 발생한 손해에 대해 책임을 지지 않습니다.
                        <h4>제9조 (분쟁 해결)</h4>

                        이 약관과 관련한 분쟁이 발생할 경우, 회사의 본사 소재지를 관할하는 법원을 제1심 법원으로 합니다.

                        <h4>제10조 (기타)</h4>
                    </p>
                </div>
                <button onClick={handleAgree} disabled={!isAgreed}>
                    동의합니다
                </button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default TermsModal;
