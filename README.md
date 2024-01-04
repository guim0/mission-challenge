# Mission Brasil: Frontend Challenge

This is the test proposed by Mission Brasil.

## Main Technologies

The project utilizes the following technologies:

- **NextJS**
- **Typescript**
- **Tailwind CSS**
- **Postcss**
- **shadcn/ui**

## if you're going to test locally:

After you cloned the repository, follow this steps:

Next Auth needs to have a value on the `.env.local` called NEXTSECRET_AUTH, that must be generated:

1. Open the terminal and type:

```
openssl rand -base64 32
```

2. Copy the code generated on your terminal and create a `.env.local` file to put this:

```
NEXTSECRET_AUTH={The code generated}
```

Now you need to generated more two values for your `.env.local` the `GITHUB_ID` and \_ `GITHUB_SECRET`

[Click here to access your Github settings ](https://github.com/settings/apps)

- Find the section called **OAuth Apps**
- Go on **New OAuth App**

You'll be redirect to a form called **Register a new OAuth application** with 4 Inputs

on **Application name**:

```
nextauth-app
```

on **Homepage URL**

```
http://localhost:3000
```

on **Authorization callback URL**

```
http://localhost:3000/api/auth/callback/github
```

---

**GREAT!** now that you configured, you need to get the **Client ID** and the **Client secrets**:

- Copy the code from Client Id and go on .env.local and create a variable called `GITHUB_ID` and past the code, should be like this:

```
NEXTSECRET_AUTH={The code generated previously}
GITHUB_ID={Past here the Client ID from github}
```

---

- Now you must generated the Client secrets, you'll need to login again and the code i'll appear, then add a new variable on your `.env.local` just like the `GITHUB_ID` but called `GITHUB_SECRETS`, should be like this:

```
NEXTSECRET_AUTH={The code generated previously}
GITHUB_ID={The code pasted previously}
GITHUB_ID={Past here the Client secrets ID from github}
```

## Getting Started

Make sure you have Node.js installed. Then, follow these steps:

1. Navigate to the project directory:

   ```bash
   cd mission-challenge
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

3. Start the project:

   ```bash
   npm run dev
   ```

## Deployed on Vercel:

### [Click Here to access](mission-challenge-guimo.vercel.app)

---

## How to contact me:

### [Linkedin](https://www.linkedin.com/in/guim0-dev)

### My email

```
guimodev@gmail.com
```
