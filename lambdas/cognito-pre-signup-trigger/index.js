'use strict'
// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// This lambda function is attached to the Cognito User Pool's "Pre Sign-up"
// Lambda Trigger, which determines whether a user should be allowed to sign
// up.
//
// Note that, in Invite mode, the `AllowAdminCreateUserOnly` option is
// configured on the user pool's `AllowAdminCreateUserOnly` property. So the
// hosted UI will block the user from signing up, and this lambda will never
// run.

// Pulled from https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type%3Demail) and
// optimized in a few ways for size:
// - Classes of `[A-Za-z0-9]` were shortened to the equivalent `[^_\W]`.
// - Other instances of `0-9` in classes were converted to the shorthand `\d`.
// - The whole regexp was made case-insensitive to avoid the need for `A-Za-z` in classes.
// - As we're only testing, I replaced all the non-capturing groups with capturing ones.
//
// This is the same regexp as is used in dev-portal/src/pages/Admin/Accounts/PendingInvites.jsx.
exports.handler = async event => {
  const userEmailDomain = event.request.userAttributes.email.split("@")[1];
  const allowedDomains = ["digital.cabinet-office.gov.uk","cabinet-office.gov.uk"];
  if (!allowedDomains.includes(userEmailDomain)) {
      throw new Error("Invalid email domain");
  }
  return event;
}
