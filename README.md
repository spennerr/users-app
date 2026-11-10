# Användarportal

En liten React-app som hämtar användare från ett externt REST-API och visar dem
i en lista och en detaljvy. Byggd med React, TypeScript, Vite,
react-router-dom och TanStack Query.

## Funktioner

- **Översikt** (`/`) med antal användare och information om API:et.
- **Användarlista** (`/users`) med sökning på namn, användarnamn, e-post, stad
  och roll.
- **Detaljvy** (`/users/:userId`) med kontaktuppgifter, inställningar och roller.
- **404-sida** för adresser som inte finns.
- Tydliga lägen för **laddning**, **fel** och **tomt** resultat.
- Responsiv design och stöd för mörkt läge.

## Så fungerar det

```text
URL
 ↓
App.tsx väljer sida
 ↓
Sidan anropar useUsers()
 ↓
useQuery hämtar med fetchUsers()
 ↓
fetch skickar x-api-key och får JSON
 ↓
TanStack Query cachar listan
 ↓
React visar den
```

- `src/api/users.ts` innehåller API-adressen, API-nyckeln och `fetchUsers`.
  Det är en vanlig `fetch` med felkontroll – ingen egen klient och ingen egen
  cache.
- `src/hooks/useUsers.ts` innehåller `useQuery` och dess inställningar. Det är
  den enda platsen där data hämtas.
- Listan och detaljvyn använder samma query key `['users']`. Därför läser
  detaljvyn listan från cachen och gör inget nytt API-anrop.

## Kom igång

```bash
npm install
npm run dev
```

Appen startar på `http://localhost:5173`.

```bash
npm run build   # typkontroll + produktionsbygge
npm run lint    # ESLint
npm run preview # förhandsgranska bygget
```

## API

```text
GET https://api-userapi.onrender.com/api/users/getUsers
Header: x-api-key: elev-hemlighet-2026
```

API:et tillåter **100 anrop per dygn**. Därför cachas listan i 30 minuter, ligger
kvar i cachen i 24 timmar och hämtas inte om när fönstret får fokus. Vid ett
tillfälligt serverfel visas ett meddelande och en knapp för att försöka igen.

Nyckeln är kursens publika demonyckel och ligger i `src/api/users.ts`.

## Filstruktur

```text
src/
├── api/users.ts                 # API-adress, nyckel och fetchUsers
├── components/
│   ├── Navigation/              # Meny
│   ├── StateViews/              # Laddar, fel och tomt
│   └── Users/                   # Sökfält och användarkort
├── hooks/useUsers.ts            # useQuery
├── pages/                       # En fil per vy
├── types/user.ts                # Typen User
├── utils/userFormatting.ts      # Initialer och notiser
├── App.tsx                      # Rutter
└── main.tsx                     # Start och providers
```

## Kravuppfyllelse (G)

| Krav | Lösning |
| --- | --- |
| React SPA med TypeScript | React 19 och TypeScript med `strict: true` |
| react-router-dom med minst 2 sidor | Fyra rutter i `src/App.tsx` |
| Navigationsmeny | `src/components/Navigation/Navigation.tsx` |
| `useQuery` för datahämtning och cachning | `src/hooks/useUsers.ts` |
| API-anrop med `x-api-key` | `src/api/users.ts` |
| Loading-, error- och empty-states | `StatusMessage` och respektive sida |
| Modulär struktur | `api`, `components`, `hooks`, `pages`, `types`, `utils` |
| Git och versionshantering | Koden ligger på `main` |

## Tekniska val

- **react-router-dom** ger riktiga URL:er som går att dela och bokmärka.
- **TanStack Query** hanterar hämtning, cache, statusar och retry. Därför finns
  ingen egen `useEffect`-lösning och ingen egen klient.
- **`fetch`** är inbyggt i webbläsaren och räcker för ett enkelt GET-anrop.
- **Cachning i 30 minuter** skyddar API:ets gräns på 100 anrop per dygn.
