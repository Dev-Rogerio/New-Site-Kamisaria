import React from "react";
import { motion } from "framer-motion";
import "../ModalSucesso/ModalSucesso.css";

const ModalSucesso = ({ onClose }) => {
    return (
        <div className="pix-modal-overlay">
            <motion.div
                className="screen-Sucesso"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Ícone Check */}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00c851"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pix-check-icon"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <motion.path d="M20 6L9 17L4 12" />
                </motion.svg>

                <motion.h2
                    className="pix-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    ✅ Pagamento Aprovado!
                </motion.h2>

                <motion.p
                    className="pix-info-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Seu pagamento foi confirmado com sucesso.
                </motion.p>

                <motion.button
                    className="pix-button"
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Fechar
                </motion.button>
            </motion.div>
        </div>
    );
};

export default ModalSucesso;
