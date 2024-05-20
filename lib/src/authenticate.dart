import 'pronote/login_portal_dowloader.dart';
import 'pronote/login_portal_session_extractor.dart';

import 'constants/accounts.dart';
import 'utils/url.dart';

void authenticateWithCredentials({
  required final String loginPortalUrl,
  required final ApiAccountType accountType,
  required final String username,
  required final String password,
  required final String deviceUuid
}) async {
  var instanceRootUri = loginPortalUrlToInstanceRootUri(loginPortalUrl);

  if (instanceRootUri == null) {
    throw Exception('Invalid Pronote URL');
  } 

  instanceRootUri = instanceRootUri.replace(
    path: '${instanceRootUri.path}/${accountType.path}',
    // Add compatibility and ENT bypasses.
    query: 'fd=1&bydlg=A6ABB224-12DD-4E31-AD3E-8A39A1C2C335&login=true'
  );

  const pronoteCookies = <String>{'ielang=fr'};

  final body = await loginPortalDownloader(instanceRootUri, pronoteCookies);
  final session = loginPortalSessionExtractor(body);
}