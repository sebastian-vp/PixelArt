import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Toast } from "@/components";
import { useAuth } from "@/hooks";

import styles from "./UserMenu.module.css";

interface Props {
  name: string;
  email: string;
}

export function UserMenu({ name, email }: Props) {
  const [isMenuOPen, setIsMenuOpen] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const setToast: (value: React.ReactElement | null) => void = useOutletContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onLogout() {
    if (isSubmitting) return;

    setToast(null);
    setIsSubmitting(true);

    try {
      await signOut();
      navigate("/login", { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "No pudimos cerrar tu sesión. Inténtalo nuevamente.";

      setToast(<Toast type="error" title="No se pudo cerrar la sesión" message={message} />);
    } finally {
      setIsSubmitting(false);
    }
  }

  const initials = name.split(" ").reduce<string>((acc, i) => acc + i.at(0), "");

  useEffect(() => {
    if (!isMenuOPen) return;

    function handleClickOutside(e: MouseEvent) {
      if (!footerRef.current?.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOPen]);

  return (
    <footer className={styles["user"]} ref={footerRef}>
      {isMenuOPen && (
        <div className={styles["user-menu"]}>
          <button className={styles["user-menu-item"]} onClick={onLogout} disabled={isSubmitting}>
            <LogOut size={20} />
            {isSubmitting ? "Cerrando sesión…" : "Cerrar sesión"}
          </button>
        </div>
      )}
      <button className={`${styles["button"]} ${isMenuOPen && styles["active"]}`} onClick={() => setIsMenuOpen(!isMenuOPen)}>
        <div className={styles["avatar"]} aria-hidden="true">
          {initials}
        </div>
        <div className={styles["user-info"]}>
          <p className={styles["user-name"]}>{name}</p>
          <p className={styles["user-email"]}>{email}</p>
        </div>
        <span className={styles["chevron"]}>{isMenuOPen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
      </button>
    </footer>
  );
}
