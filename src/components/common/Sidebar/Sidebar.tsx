import { NavLink } from 'react-router-dom'
import styles from   './Sidebar.module.css'
export function Sidebar(){
    return(
        <nav className={styles.sidebar}>
            <NavLink className={({isActive})=> (isActive? styles.active :'') } to="/admin" end>Meu Abrigo</NavLink>
            <NavLink className={({isActive})=> (isActive? styles.active :'')} to="/admin/pets" end>Pets</NavLink>
            <NavLink to="/" end > Sair</NavLink>
        </nav>
        
    )
}