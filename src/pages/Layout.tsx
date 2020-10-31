import React from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';

const Layout = () => {
    const divStyle = {
        height: '100vh',
        backgroundColor: '#e4e4ff'
    };
    return (
        <div className="app-container" style={divStyle}>
            <header className="p-shadow-1">
                <div className="title">Header</div>
                <div className="buttons">
                    <Button icon="pi pi-bookmark" className="p-button-rounded p-button-secondary" />
                </div>
            </header>
            <main>
                <div className="left-col">
                    <Accordion multiple>
                        <AccordionTab header="Header I" contentClassName="toto">
                            <div className="list-item">qsdfqsdfq sdfqsdf </div>
                        </AccordionTab>
                        <AccordionTab header="Header II">
                            <div className="list-item p-text-nowrap p-text-truncate">qsdfqsdfqsdfqsdf qsdf qsdfq sdfq sdfqsdf </div>
                        </AccordionTab>
                        <AccordionTab header="Header III">
                            <div className="list-item">qsdfqsdfq sdfqsdf </div>
                            <div className="list-item">qsdfqsdfq sdfqsdf </div>
                            <div className="list-item">qsdfqsdfq sdfqsdf </div>
                            <div className="list-item">qsdfqsdfq sdfqsdf </div>
                            <div className="list-item">qsdfqsdfq sdfqsdf </div>
                            <div className="list-item">qsdfqsdfq sdfqsdf </div>
                            <div className="list-item">qsdfqsdfq sdfqsdf </div>
                        </AccordionTab>
                    </Accordion>
                </div>
                <div className="center-col">center</div>
                <div className="right-col">right</div>
            </main>
            <footer>Item 3</footer>
        </div>
    )
};

export default Layout;
