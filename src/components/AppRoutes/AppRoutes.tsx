import React, { FC, useCallback, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import {
  ABOUT,
  CONTACTS,
  EDIT_PROFILE,
  PROVIDER_TRADING,
  SIGN_IN,
  SIGN_UP,
} from "utils/constants";
import { getUserIdAndRole } from "utils/auth";

import {
  AboutPage,
  ProvidersPage,
  SignInPage,
  ContactsPage,
  SignupPage,
  EditProfilePage,
  ProviderTradingPage,
  ProviderPage,
  NotFoundPage,
} from "pages";
import { Role } from "store/types";

export const AppRoutes: FC = () => {
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const { id, role } = getUserIdAndRole();

  const redirectToProviderPaget = useCallback(() => {
    if (pathname === "/" && role === Role.Provider) {
      navigate(encodeURI(`/${id}`));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    redirectToProviderPaget();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, role]);

  return (
    <Routes>
      <Route path={encodeURI("/")} element={<ProvidersPage />} />

      <Route path={encodeURI("/:id/*")} element={<ProviderPage />} />

      <Route path={encodeURI(ABOUT.toLowerCase())} element={<AboutPage />} />

      <Route
        path={encodeURI(CONTACTS.toLowerCase())}
        element={<ContactsPage />}
      />

      <Route path={encodeURI(SIGN_IN.toLowerCase())} element={<SignInPage />} />

      <Route path={encodeURI(SIGN_UP.toLowerCase())} element={<SignupPage />} />

      <Route
        path={encodeURI(EDIT_PROFILE.toLowerCase())}
        element={<EditProfilePage />}
      />

      <Route
        path={encodeURI(`${PROVIDER_TRADING.toLowerCase()}/:id/*`)}
        element={<ProviderTradingPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
