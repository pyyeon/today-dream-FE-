import React, { useState, useRef } from 'react';

const TermsModal: React.FC<{ onClose: () => void; onAgree: () => void }> = ({ onClose, onAgree }) => {
    const [isAgreed, setIsAgreed] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const element = contentRef.current;
        if (element) {
            const { scrollTop, scrollHeight, clientHeight } = element;
            // 스크롤이 끝까지 도달했는지 확인
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                setIsAgreed(true);
            } else {
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
                    style={{
                        height: '200px',
                        overflowY: 'scroll',
                        padding: '10px',
                        border: '1px solid #ccc',
                        lineHeight: '1.5',
                    }}
                >
                    <p>
                        <strong>이용약관</strong>
                        <h4>제1조 (목적)</h4>
                        본 약관은 오늘드림(이하 "서비스")의 이용과 관련하여 서비스 제공자(이하 "회사")와 이용자 간의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.

                        <h4>제2조 (용어의 정의)</h4>
                        "서비스"란 회사가 운영하는 웹사이트 및 관련 서비스를 의미합니다.<br />
                        "이용자"란 본 약관에 따라 서비스를 이용하는 모든 회원 및 비회원을 의미합니다.<br />
                        "회원"이란 서비스에 가입하여 이메일 인증을 완료하고 로그인을 통해 서비스를 이용하는 자를 의미합니다.<br />
                        "게시물"이란 이용자가 서비스 내에서 작성한 텍스트, 댓글, 좋아요 등의 모든 형태의 정보를 의미합니다.

                        <h4>제3조 (약관의 효력 및 변경)</h4>
                        본 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.<br />
                        회사는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 변경 사항은 공지사항을 통해 사전 고지합니다.<br />
                        이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있으며, 계속 이용하는 경우 약관 변경에 동의한 것으로 간주됩니다.

                        <h4>제4조 (서비스의 제공 및 변경)</h4>
                        회사는 이용자에게 다음과 같은 서비스를 제공합니다.<br />
                        - 텍스트 입력 및 결과 제공<br />
                        - 게시판을 통한 정보 공유<br />
                        - 게시물에 대한 좋아요 및 댓글 기능<br />
                        - 타로 기능 (별도의 데이터 저장 없음)<br />
                        - 기타 회사가 추가 개발하거나 제휴 계약 등을 통해 제공하는 서비스<br />
                        회사는 서비스의 운영상 또는 기술적 필요에 따라 일부 또는 전부를 변경할 수 있으며, 중요한 변경 사항이 있을 경우 사전에 공지합니다.

                        <h4>제5조 (회원 가입 및 관리)</h4>
                        회원가입은 이메일 인증을 통해 이루어지며, 이용자는 본인의 정확한 정보를 제공해야 합니다.<br />
                        회원 계정의 관리 책임은 회원 본인에게 있으며, 계정 정보의 도용 및 부정 사용에 대한 책임은 이용자 본인에게 있습니다.<br />
                        회사는 다음 각 호에 해당하는 경우 회원 가입을 제한하거나 이용을 중지할 수 있습니다.<br />
                        - 허위 정보를 제공한 경우<br />
                        - 다른 사람의 명의를 도용한 경우<br />
                        - 서비스 운영을 방해하는 행위를 한 경우

                        <h4>제6조 (개인정보 보호)</h4>
                        회사는 회원 가입 시 이메일 정보를 수집하며, 본인 인증 및 로그인 용도로만 사용됩니다.<br />
                        회사는 관련 법령에 따라 개인정보 보호 조치를 준수하며, 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.<br />
                        이용자는 서비스 내 개인정보 설정을 통해 본인의 정보를 수정 및 삭제할 수 있습니다.

                        <h4>제7조 (게시물의 관리 및 저작권)</h4>
                        이용자가 서비스에 게시한 콘텐츠의 저작권은 이용자에게 있으며, 회사는 해당 콘텐츠를 서비스 운영 및 홍보 목적으로 사용할 수 있습니다.<br />
                        다음과 같은 게시물은 사전 통지 없이 삭제될 수 있습니다.<br />
                        - 불법적인 내용이 포함된 경우<br />
                        - 타인의 권리를 침해하는 경우<br />
                        - 기타 운영 정책에 위배되는 경우<br />
                        게시판의 모든 게시물은 공개되며, 로그인한 회원만 좋아요 및 댓글을 작성할 수 있습니다.

                        <h4>제8조 (서비스 이용 제한)</h4>
                        회사는 이용자가 다음과 같은 행위를 하는 경우 서비스 이용을 제한할 수 있습니다.<br />
                        - 불법 행위 및 부정 이용 행위<br />
                        - 타인의 권리를 침해하는 행위<br />
                        - 서비스의 정상적인 운영을 방해하는 행위<br />
                        이용 제한 조치에 대한 이의 신청이 있을 경우, 회사는 합리적인 절차를 통해 검토 후 조치를 결정합니다.

                        <h4>제9조 (책임의 제한)</h4>
                        회사는 서비스 이용과 관련하여 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.<br />
                        이용자가 서비스 내 정보를 신뢰하여 발생한 문제에 대해 회사는 책임을 지지 않습니다.<br />
                        회사는 천재지변, 시스템 장애, 해킹 등의 불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.

                        <h4>제10조 (준거법 및 관할 법원)</h4>
                        본 약관은 대한민국 법률에 따라 해석됩니다.<br />
                        서비스 이용과 관련하여 발생한 분쟁은 회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.
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

export default TermsModal;
