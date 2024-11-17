import React from "react";
import styles from './styles.module.css'
import {useDarkMode} from "@/lib/use-dark-mode";

import * as config from '@/lib/config'

export function FooterImpl(){
    const [hasMounted, setHasMounted] = React.useState(false)
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const currentYear = new Date().getFullYear()

    const onToggleDarkMode = React.useCallback(
        (e) => {
            e.preventDefault()
            toggleDarkMode()
        },
        [toggleDarkMode]
    )

    React.useEffect(() => {
        setHasMounted(true)
    }, [])

    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>
                Copyright {currentYear} {config.author}
            </div>
        </footer>
    )
}

export const Footer = React.memo(FooterImpl)