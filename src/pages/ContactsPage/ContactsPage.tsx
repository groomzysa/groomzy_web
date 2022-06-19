import React, { FC, useEffect, useState } from "react";
import { Alert, Grid } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";

import { useSendMail } from "api/hooks/mutations";
import { GButton, GTextField } from "components";

import { useStyles } from "./styles";

export const ContactsPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [subject, SetSubject] = useState<string>("");
  const [sendMailSuccessMessage, setSendMailSuccessMessage] =
    useState<string>("");
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    sendMailMutation,
    message: successMessage,
    sendMailLoading,
    sendMailErrorMessage,
    sendMailhasError,
  } = useSendMail();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!successMessage) return;
    setSendMailSuccessMessage(successMessage);
    setEmail("");
    setFullName("");
    setMessage("");
    SetSubject("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage]);

  useEffect(() => {
    if (!sendMailSuccessMessage) return;

    setTimeout(() => {
      setSendMailSuccessMessage("");
    }, 5000);
  }, [sendMailSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleClickInstagram = () => {
    window.open("https://instagram.com/groomzy_", "_blank");
  };

  const handleClickFacebook = () => {
    window.open("https://facebook.com/groomzy", "_blank");
  };

  const handleSendEmail = () => {
    sendMailMutation({
      fullName,
      email,
      message,
      subject,
    });
  };

  return (
    <Grid className={classes.center} container>
      <Grid item xs={0} md={2} lg={3}></Grid>
      <Grid item xs={12} md={8} lg={6}>
        <Grid container direction="column">
          <Grid item xs>
            {sendMailhasError ? (
              <Alert severity="error">{sendMailErrorMessage}</Alert>
            ) : null}
          </Grid>
          <Grid item xs>
            {sendMailSuccessMessage ? (
              <Alert severity="success">{sendMailSuccessMessage}</Alert>
            ) : null}
          </Grid>
          <Grid className={`${classes.padTop10} ${classes.heading}`} item xs>
            Get in touch with us
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="fullName"
              label="Full name"
              type="text"
              setText={setFullName}
              textValue={fullName}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="email"
              label="Email"
              type="email"
              setText={setEmail}
              textValue={email}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="subject"
              label="Subject"
              type="text"
              setText={SetSubject}
              textValue={subject}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="message"
              label="Message"
              type="text"
              setText={setMessage}
              textValue={message}
              multiline
              rows={10}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GButton
              children="Send"
              onClick={handleSendEmail}
              loading={sendMailLoading}
              className={classes.button}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <Grid container justifyContent="center">
              <Grid item className={classes.pad10}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  onClick={handleClickInstagram}
                  className={classes.cursor}
                >
                  <Grid item>
                    <Instagram className={classes.instagram} fontSize="large" />
                  </Grid>
                  <Grid item>groomzy_</Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.pad10}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  onClick={handleClickFacebook}
                  className={classes.cursor}
                >
                  <Grid item>
                    <Facebook className={classes.facebook} fontSize="large" />
                  </Grid>
                  <Grid item>Groomzy</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} md={2} lg={3}></Grid>
      </Grid>
    </Grid>
  );
};
