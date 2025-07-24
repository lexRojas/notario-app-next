'use client'

import { Button, MegaMenu, MegaMenuDropdown, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export function MenuPrincipal() {

    return (
        <MegaMenu>
            <NavbarBrand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Mi Aplicación</span>
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
                                <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Escrituras
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Registro
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Actos por Registro
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Timbres
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Rangos de Honorarios
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Variables
                                </Link>
                            </li>
                        </ul>
                    </div>

                </MegaMenuDropdown>


                {/* Menú "Cálculos" */}

                <MegaMenuDropdown toggle={<>Cálculos</>}>

                    <ul className="grid grid-cols-2">
                        <div className="space-y-4 p-4">
                            <li>
                                <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Honorarios Abogado
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Honorarios Notario
                                </Link>
                            </li>
                        </div>
                    </ul>

                </MegaMenuDropdown>


                {/* Menú "Acerca de" */}
                <NavbarLink href="#">Acerca de</NavbarLink>
            </NavbarCollapse>
        </MegaMenu>
    );
}
