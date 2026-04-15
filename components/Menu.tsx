'use client'

import { Button, MegaMenu, MegaMenuDropdown, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export function MenuPrincipal() {

    return (
        <MegaMenu>
            <NavbarBrand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Notario Rojas</span>
            </NavbarBrand>
            <div className="order-2 hidden items-center md:flex">
                <Link
                    href="#"
                    className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 md:mr-2 md:px-5 md:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                    Login
                </Link>
                <Button href="#">Sign up</Button>
            </div>
            <NavbarToggle />
            <NavbarCollapse>
                {/* Menú "Registros" */}
                <MegaMenuDropdown toggle={<>Registros</>}>

                    <div>
                        <ul >
                            <li>
                                <Link href="/escritura" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Escrituras
                                </Link>
                            </li>

                        </ul>
                    </div>

                </MegaMenuDropdown>


                {/* Menú "Reportes" */}

                <MegaMenuDropdown toggle={<>Reportes</>}>

                    <ul className="grid grid-cols-2">
                        <div className="space-y-4 p-4">
                            <ul>
                                <li>
                                    <Link href="/reportes/indice" className="hover:text-primary-600 dark:hover:text-primary-500">
                                        Indice Notarial
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/reportes/lista_escrituras" className="hover:text-primary-600 dark:hover:text-primary-500">
                                        Escrituras digitadas
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </ul>

                </MegaMenuDropdown>

                {/* Menú "Acerca de" */}
                <NavbarLink href="#">Acerca de</NavbarLink>
            </NavbarCollapse>
        </MegaMenu>
    );
}
