import { Button, ButtonVariant } from "../../components/common/Button";

import styles from "./Home.module.css";
import dog from "./../../assets/dog.svg";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.loginContainer}>
        <div className={styles.loginContent}>
          <div className={styles["loginContentHeader"]} id="logo">
            <h2>
              Bem-vindos ao <strong>Luz dos bichos</strong>
            </h2>
            <p>
              Aqui, cada animal é uma estrela à espera de um novo começo.
              Junte-se a nós em nossa missão de oferecer amor, cuidado e um lar
              seguro para nossos amigos peludos. Explore como você pode ajudar
              ou adotar e mudar uma vida hoje!
            </p>
          </div>
          <div>
            <form className={styles["login-form"]}>
              <Link to="/pets" className={styles.link}>
                <Button
                  variant={ButtonVariant.Default}
                  
                 
                >
                 Quero Adotar
                </Button>
              </Link>
              <Link to="/admin" className={styles.link}>
                <Button
                  variant={ButtonVariant.Outlined}
                >
                  Tenho um abrigo
                </Button>
              </Link>
            </form>
            <p>
              Projeto de Desenvolvimento curso FullStack Pecege.
              <br />
              <strong>Termos e Serviços</strong> e{" "}
              <strong>Politica de Privacidade</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
