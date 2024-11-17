import type * as types from 'notion-types'
import {TiEye} from "react-icons/ti";
import {TiEyeOutline} from "react-icons/ti";
import cs from 'classnames'
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'
import exp from "node:constants";

function ToggleThemeButton() {
    const [hasMounted, setHasMounted] = React.useState(false)
    const { isDarkMode, toggleDarkMode } = useDarkMode()

    React.useEffect(() => {
        setHasMounted(true)
    }, [])

    const onToggleTheme = React.useCallback(() => {
        toggleDarkMode()
    }, [toggleDarkMode])

    return (
        <div
            className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
            onClick={onToggleTheme}
        >
            {hasMounted && isDarkMode ? <TiEye /> : <TiEyeOutline />}
        </div>
    )
}

export function NotionPageHeader({
                                     block
                                 }: {
    block: types.CollectionViewPageBlock | types.PageBlock
}) {
    const { components, mapPageUrl } = useNotionContext()


    return (
        <header className='notion-header'>
            <div className='notion-nav-header'>
                <Breadcrumbs block={block} rootOnly={true}/>

                <div className='notion-nav-header-rhs breadcrumbs'>
                    <components.PageLink
                        href="https://jesterromut.notion.site/grand-finale"
                        key={0}
                        className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                        {"View in Notion"}
                    </components.PageLink>
                    {navigationLinks
                        ?.map((link, index) => {
                            if (!link.pageId && !link.url) {
                                return null
                            }

                            if (link.pageId) {
                                return (
                                    <components.PageLink
                                        href={mapPageUrl(link.pageId)}
                                        key={index}
                                        className={cs(styles.navLink, 'breadcrumb', 'button')}
                                    >
                                        {link.title}
                                    </components.PageLink>
                                )
                            } else {
                                return (
                                    <components.Link
                                        href={link.url}
                                        key={index}
                                        className={cs(styles.navLink, 'breadcrumb', 'button')}
                                    >
                                        {link.title}
                                    </components.Link>
                                )
                            }
                        })
                        .filter(Boolean)}

                    <ToggleThemeButton/>

                    {isSearchEnabled && <Search block={block} title={null}/>}
                </div>
            </div>
        </header>
    )
}