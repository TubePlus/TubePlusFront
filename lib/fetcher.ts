export const mockUrl = process.env.NEXT_PUBLIC_MOCKSERVER_URL;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const endpointPrefix = '/api/v1';

// TODO: Error Toast 추가

/**
 * @warning     MockAPI
 * @description get a user from server
 * @param       tags
 * @returns     json body
 */
export const getAUserByEmail = (email: string) => {
  // NOTE: body에 email
  const url = new URL(mockUrl + endpointPrefix + 'users');
  url.searchParams.append('email', email);

  const result = fetch(url, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .catch(e => console.log(e));
  return result;
};

/**
 * @warning     MockAPI
 * @description get a user from server
 * @param       tags
 * @returns     json body
 */
export const setAUser = (
  username: string,
  email: string,
  profileImage: string,
  uuid: string,
) => {
  // NOTE: body에 username, email, profileImage, uuid
  const body = {
    username: username,
    email: email,
    profileImage: profileImage,
    uuid: uuid,
  };

  const result = fetch(new URL(mockUrl + endpointPrefix + 'users'), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .catch(e => console.log(e));
  return result;
};

/**
 * @warning     MockAPI
 * @description get all users from server
 * @param       tags
 * @returns     json body
 */
export const getAllUsers = () => {
  const result = fetch(`${mockUrl}${endpointPrefix}/users`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then(alluser => alluser.json());
  return result;
};

export const getAllBoards = () => {
  const result = fetch(`${mockUrl}${endpointPrefix}/boards`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then(alluser => alluser.json());
  return result;
};

export const getAllPosts = () => {
  const result = fetch(`${mockUrl}${endpointPrefix}/post`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then(alluser => alluser.json());
  return result;
};

/**
 * @warning     MockAPI
 * @param query this query means searchParam generally
 * @returns
 */
export const searchCreator = (query: string) => {
  const result = fetch(`${mockUrl}${endpointPrefix}/users?username=${query}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  }).then(result => result.json());
  return result;
};
