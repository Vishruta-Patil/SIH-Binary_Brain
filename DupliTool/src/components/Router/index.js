import { LogIn } from "pages/auth/login";
import { SignIn } from "pages/auth/signin";
import { BlackListedVendor } from "pages/blacklistedVendor";
import { AuthorisedVendor } from "pages/blacklistedVendor/authorizedVedor";
import { Home } from "pages/home";
import { PageNotFound } from "pages/PageNotFound";
import { Palagrism } from "pages/palagrism";
import { BookDetails } from "pages/piracy/BookDetails";
import { CoverAndBackPage } from "pages/piracy/coverNBackPage";
import { LengthDetection } from "pages/piracy/LengthDetection";
import { Watermark } from "pages/piracy/watermark";
import { Result } from "pages/result";
import { Result1 } from "pages/result/index1";
import { Review } from "pages/review";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<PageNotFound />} />
      <Route
        path="/palagrism"
        element={
          <PrivateRoute>
            <Palagrism />
          </PrivateRoute>
        }
      />
      <Route
        path="/book-details"
        element={
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/length-width-detection"
        element={
          <PrivateRoute>
            <LengthDetection />
          </PrivateRoute>
        }
      />
      <Route
        path="/cover-backpage-detection"
        element={
          <PrivateRoute>
            <CoverAndBackPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/result"
        element={
          <PrivateRoute>
            <Result1 />
          </PrivateRoute>
        }
      />
      <Route
        path="/review"
        element={
          <PrivateRoute>
            <Review />
          </PrivateRoute>
        }
      />
      <Route
        path="/blacklisted-vendor"
        element={
          <PrivateRoute>
            <BlackListedVendor />
          </PrivateRoute>
        }
      />

<Route
        path="/watermark"
        element={
          <PrivateRoute>
            <Watermark />
          </PrivateRoute>
        }
      />

<Route
        path="/authorized-vendor"
        element={
          <PrivateRoute>
            <AuthorisedVendor />
          </PrivateRoute>
        }
      />
      
    </Routes>
  );
};
