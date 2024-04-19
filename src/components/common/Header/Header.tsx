import { Link } from 'react-router-dom'
import { Button, ButtonVatiant } from '../Button'
import styles from './Header.module.css'

interface IHeader {
    showReturn?:boolean
}

export function Header({showReturn}:IHeader){
    return (
      <header className={styles.header}>
        <Link to="/admin">
          <Button variant={ButtonVatiant.Outlined}> Tenho um Abrigo</Button>
        </Link>
        {showReturn && (
            <Link to='/pets'>
                <Button variant={ButtonVatiant.Text}>Voltar</Button>
            </Link>
        )}
      </header>
    );
}