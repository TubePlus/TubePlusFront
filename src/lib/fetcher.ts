export const mockUrl = process.env.NEXT_PUBLIC_MOCKSERVER_URL;
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const endpointPrefix = '/api/v1';

// TODO: Error Toast 추가

/**
 * @warning     MockAPI
 * @description get slides from server
 * @param
 * @returns     json body
 */
export const getSlides = () => {
  // NOTE: body에 email
  const url = new URL(mockUrl + endpointPrefix + 'banner');

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
 * @description get hot creators from server
 * @param
 * @returns     json body
 */
export const getRanksfromMock = () => {
  // NOTE: body에 email
  const url = new URL(mockUrl + endpointPrefix + 'hotCreator');

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
 * @description get hot creators from server
 * @param
 * @returns     json body
 */
export const getShorts = () => {
  // NOTE: body에 email
  const url = new URL(mockUrl + endpointPrefix + 'shorts');

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

export const getShortsFromServer = () => {
  // NOTE: body에 email
  const url = new URL('https://tubeplus.duckdns.org/api/v1/etc/trendingVideos');

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

export const preLogin = ({
  email,
  token,
}: {
  email: string;
  token: string | undefined;
}) => {
  const logInBody = {
    email,
    token,
  };

  const response = fetch(baseUrl + endpointPrefix + '/users/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(logInBody),
  });

  return response;
};

export const retrieveUser = ({
  email,
  token,
}: {
  email: string;
  token: string | undefined;
}) => {
  const logInBody = {
    email,
    token,
  };

  const response = fetch(baseUrl + endpointPrefix + '/users/retrieve', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(logInBody),
  });

  return response;
};

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

export const deleteUser = async (uuid: string) => {
  const res = await fetch(baseUrl + endpointPrefix + '/users/softdelete', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ uuid }),
  });
  const data = await res.json();
  return data;
};

/**
 * @warning     tubePlus Server API
 * @description get a user from server
 * @param       uuid
 * @returns     json body
 */
export const getUserByUuid = (uuid: string) => {
  const body = {
    uuid: uuid,
  };

  const result = fetch(baseUrl + endpointPrefix + '/users/info', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(res => {
      return res.json();
    })
    .catch(e => console.log(e));
  return result;
};

/**
 * @warning     tubePlus Server API
 * @description get a user from server
 * @param       uuid
 * @returns     json body
 */
export const getMyJoinedCommunities = (uuid: string) => {
  const body = {
    uuid: uuid,
  };

  const result = fetch(
    `${baseUrl}${endpointPrefix}/communities/users/me/joined-communities?page=0&size=5`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    },
  )
    .then(res => {
      return res.json();
    })
    .catch(e => console.log(e));
  return result;
};

/**
 * @warning     tubePlus Server API
 * @description get a user from server
 * @param       uuid
 * @returns     json body
 */
export const updateAUser = (editableValue: {
  uuid: string;
  username: string;
  profileImage: string;
  locale: string;
  bio: string;
}) => {
  const body = {
    uuid: editableValue.uuid,
    username: editableValue.username,
    profileImage: editableValue.profileImage,
    locale: editableValue.locale,
    bio: editableValue.bio,
  };

  const result = fetch(baseUrl + endpointPrefix + '/users/info', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(res => {
      return res.json();
    })
    .catch(e => console.log(e));
  return result;
};

/**
 * @warning     tubePlus Server API
 * @description POST a post on the board
 * @param
 * @returns     json body
 */
export const uploadPost = (post: {
  boardId: number;
  authorUuid: string;
  title: string;
  contents: string;
  withImage: boolean;
}) => {
  const body = {
    boardId: post.boardId,
    authorUuid: post.authorUuid,
    title: post.title,
    contents: post.contents,
    withImage: post.withImage,
  };

  const result = fetch(
    'https://tubeplus1.duckdns.org' +
      endpointPrefix +
      '/board-service/postings',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    },
  )
    .then(res => {
      return res.json();
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

/**
 * @warning       MockAPI
 * @param   uuid  user uuid
 * @returns Post[]
 */
export const getPostsByUuid = (uuid: string) => {
  const url = new URL(`${mockUrl}${endpointPrefix}/post`);
  url.searchParams.append('authorUuid', uuid);

  const result = fetch(url, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(e => {
      console.log(e);
    });
  return result;
};

/**
 * @warning       MockAPI
 * @param   uuid  user uuid
 * @returns Community[]
 */
export const getCommunitiesByUuid = (uuid: string) => {
  // const url = `${mockUrl}${endpointPrefix}/users/me/${uuid}`;
  const url = new URL(`${mockUrl}${endpointPrefix}/post`);
  url.searchParams.append('authorUuid', uuid);

  const result = fetch(url, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(e => {
      console.log(e);
    });
  return result;
};

/**
 * @warning       MockAPI
 * @param   uuid  user uuid
 * @returns Community[]
 */
export const getFavoritesByUuid = (uuid: string) => {
  // const url = `${mockUrl}${endpointPrefix}/users/me/${uuid}`;
  const url = new URL(`${mockUrl}${endpointPrefix}/post`);
  url.searchParams.append('authorUuid', uuid);

  const result = fetch(url, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(e => {
      console.log(e);
    });
  return result;
};

/**
 * @param   uuid  user uuid
 * @returns Community[]
 */
export const putTheme = async (uuid: string) => {
  // const url = `${mockUrl}${endpointPrefix}/users/me/${uuid}`;
  const url = new URL(`${baseUrl}${endpointPrefix}/users/darkmode`);

  const result = await fetch(url, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ uuid: uuid }),
  });
  return result;
};

export const getBoardById = async (boardId: string) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const requestOptions = {
    method: 'GET',
    headers: headers,
  };

  const res = await fetch(
    `${baseUrl}${endpointPrefix}/boards/${boardId}/`,
    requestOptions,
  );

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const getAllLatestPosts = () => {
  const result = fetch(
    'https://tubeplus1.duckdns.org/api/v1/board-service/postings?search-type-req=ALL&view-type-req=PAGE&pageIndex=0&pageSize=10',
  )
    .then(res => {
      if (res.ok) return res.json();
    })
    .catch(e => console.log(e));
  return result;
};

export const getRandomCommunity = () => {
  const result = fetch(
    'https://tubeplus.duckdns.org/api/v1/communities/random/10',
  )
    .then(res => {
      if (res.ok) return res.json();
    })
    .catch(e => console.log(e));
  return result;
};

export const isVerified = (uuid: string, communityId: number) => {
  const result = fetch(
    `https://tubeplus.duckdns.org/api/v1/communities/${communityId}/verified`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid }),
    },
  )
    .then(res => {
      if (res.ok) return res.json();
    })
    .catch(e => console.log(e));
  return result;
};

export const joinCommunity = (uuid: string, communityId: number) => {
  const result = fetch(
    `https://tubeplus.duckdns.org/api/v1/communities/${communityId}/users/me`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uuid: uuid,
      }),
    },
  ).then(res => {
    if (!res.ok) {
    }
    return res.json();
  });
};
