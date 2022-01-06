// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from "@Server/i18n";
import {
    Container,
    Top,
    TopText,
    Middle,
    MiddleLeft,
    MiddleLeftButtons,
    MiddleRight,
    Apod,
    ApodButton,
} from "@Styled/Home";
import { IStore } from "@Redux/IStore";
import { HomeActions } from "@Actions";
import { Heading, LocaleButton } from "@Components";
// #endregion Local Imports

// #region Interface Imports
import { IHomePage, ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = ({
    t,
    i18n,
}) => {
    const home = useSelector((state: IStore) => state.home);
    const dispatch = useDispatch();

    const renderLocaleButtons = (activeLanguage: string) =>
        ["en", "es", "tr"].map(lang => (
            <LocaleButton
                key={lang}
                lang={lang}
                isActive={activeLanguage === lang}
                onClick={() => i18n.changeLanguage(lang)}
            />
        ));

    return (
        <Container>
            {isBrowser ? <img src="/images/Desktop.jpeg" alt="Hello Mobile" /> : "Mobile"}

            <MobileView>
                <img src="/images/mobile.jpeg" alt="Hello Mobile" />
                Hello World Mobile
            </MobileView>

            <BrowserView>
                <Top>
                    <img src="/images/desktop.jpeg" alt="Hello Nitin" />
                </Top>
                <Middle>
                    <MiddleLeft>
                        <MiddleLeftButtons>
                            {renderLocaleButtons(i18n.language)}
                        </MiddleLeftButtons>
                    </MiddleLeft>
                    <MiddleRight>
                        <TopText>{t("common:AsianetNews Website")}</TopText>
                        <Heading text={t("common:News")} />
                        <Apod>
                            <ApodButton
                                onClick={() => {
                                    dispatch(
                                        HomeActions.GetApod({
                                            params: { hd: false },
                                        })
                                    );
                                }}
                            >
                                Discover Space
                            </ApodButton>
                            <img
                                src={home.image.url}
                                height="300"
                                width="150"
                                alt="Discover Space"
                            />
                        </Apod>
                    </MiddleRight>
                </Middle>
            </BrowserView>
        </Container>
    );
};

Home.getInitialProps = async (
    ctx: ReduxNextPageContext
): Promise<IHomePage.InitialProps> => {
    await ctx.store.dispatch(
        HomeActions.GetApod({
            params: { hd: true },
        })
    );
    return { namespacesRequired: ["common"] };
};

const Extended = withTranslation("common")(Home);

export default Extended;
