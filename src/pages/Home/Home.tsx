import { Button, ButtonVatiant } from "../../components/common/Button";

import styles from './Home.module.css'
import dog from './../../assets/dog.svg'
import { Link } from "react-router-dom";
export function Home(){
    return (
      <div className={styles.container}>
        <img src={dog} width="278.2px"/>

        <Link to="/pets">
          <Button variant={ButtonVatiant.Default}>Quero Adotar</Button>
        </Link>
        <Link to="/admin">
          <Button variant={ButtonVatiant.Outlined}>Tenho um Abrigo</Button>
        </Link>
      </div>
    );
}