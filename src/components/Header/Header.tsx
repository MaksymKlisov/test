import style from './Header.module.scss'
import Logo from '../../assets/Logo.svg'
import CustomButton from "../../UI/button/CustomButton.tsx";
import cn from 'classnames'
import {CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";

const Header = () => {

    const [elementCardDom, setElementCardDom] = useState<HTMLElement | null>(null);
    const [elementRegisterDom, setElementRegisterDom] = useState<HTMLElement | null>(null);



    useEffect(  () => {
        const timerId = setTimeout(() => {
            const elementCard = document.getElementById('cardId') as HTMLElement ;
            const elementRegisterForm = document.getElementById('registerFormId') as HTMLElement;
            setElementCardDom(elementCard);
            setElementRegisterDom(elementRegisterForm)
        }, 300);

        return () => clearTimeout(timerId);
    }, []);

    if (!elementCardDom && !elementRegisterDom) {
        return (
            <CircularProgress
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto',
                    my: 30,
                }}
                size={100} />
        );
    }

    const scrollToElement = (element:  HTMLElement  ) => {
        element.scrollIntoView({
            behavior: 'smooth'
        })
    }

    return (
        <>
            <div className={style.Header}>
                <div className={cn(style.ContainerHeader, 'container')}>
                    <img className={style.Logo} src={Logo} alt="Logo"/>
                    <div className={style.ButtonHeader}>
                        <CustomButton
                            onClick={()=>scrollToElement(elementCardDom as HTMLElement)}
                        >
                            Users
                        </CustomButton>

                        <CustomButton
                            onClick={()=>scrollToElement(elementRegisterDom as HTMLElement)}
                        >
                            Sing up
                        </CustomButton>
                    </div>
                </div>

            </div>
            <div className={cn(style.imageBg, 'container')}>
                <div className={style.containerBg}>
                    <h2 className={style.headerBg}>Test assignment for front-end developer</h2>
                    <p className={style.paragraphBg}>
                        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
                        JS with a vast understanding of User design thinking as they'll be building web interfaces with
                        accessibility in mind.
                        They should also be excited to learn, as the world of Front-End Development keeps evolving.
                    </p>
                    <CustomButton
                        onClick={()=>scrollToElement(elementRegisterDom as HTMLElement)}
                        className={style.buttonBg}>
                        Sign up
                    </CustomButton>
                </div>
            </div>
        </>
    );
};

export default Header;