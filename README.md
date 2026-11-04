# Användarportal

En React-applikation som hämtar användare från ett externt REST-API och visar
dem i en responsiv, typad single page application. Projektet är byggt med
React, TypeScript, Vite, react-router-dom och TanStack Query.

## Funktioner

- **Översikt** (`/`) med statistik om datamängden och en sammanfattning av de
  tekniska valen.
- **Användarlista** (`/users`) med sökning på namn, användarnamn, e-post, stad
  och roll.
- **Detaljvy** (`/users/:userId`) med kontaktuppgifter, inställningar och roller.
- **404-sida** för adresser som inte finns.
- Tydliga lägen för **laddning**, **fel** och **tomt dataset**, inklusive
  möjlighet att försöka igen.
- Responsiv design, tangentbordsvänlig navigering och stöd för mörkt läge.

## Kravuppfyllelse

### Uppgiftens checklista

| Klart | Krav | Lösning |
| --- | --- | --- |
| ✅ | React SPA med TypeScript | React 19 + TypeScript med `strict: true` |
| ✅ | react-router-dom med minst 2 sidor | Fyra rutter: översikt, lista, detalj och 404 |
| ✅ | Navigationsmeny mellan sidorna | `src/components/Navigation/Navigation.tsx` |
| ✅ | TanStack Query (useQuery) för datahämtning + cachning | `src/hooks/useUsers.ts` |
| ✅ | API-anrop med header `x-api-key: elev-hemlighet-2026` | `src/api/client.ts` |
| ✅ | Loading / error / empty states visuellt | `StatusMessage` och respektive sida |
| ✅ | Strikt typade props | `interface ...Props` i alla komponenter som tar props |
| ✅ | Modulär struktur och Separation of Concerns | `src/api`, `components`, `config`, `hooks`, `pages`, `types`, `utils` |
| ✅ | Skydd mot fler än 100 anrop per dag | 30 min `staleTime`, 24 h `gcTime`, ingen refetch vid fokus/reconnect och ingen retry vid `429` |
| ✅ | Git-repo med koden på `main` | All kod ligger på `main` och repot är kopplat till GitHub |

### G

| Krav | Var det uppfylls |
| --- | --- |
| Minst 2 vyer med react-router-dom | `src/App.tsx` – fyra rutter: översikt, lista, detalj och 404 |
| Använda useQuery | `src/hooks/useUsers.ts` |
| Hantera tomma dataset | `src/pages/UsersPage.tsx`, `src/pages/OverviewPage.tsx` |
| Hantera error från fetch | `src/api/client.ts`, `src/pages/UsersPage.tsx`, `src/pages/UserDetailPage.tsx` |
| Bygga modulärt | `src/api`, `src/components`, `src/config`, `src/hooks`, `src/pages`, `src/types`, `src/utils` |
| Versionshantering med Git | Repot har en beskrivande commit-historik och `.gitignore` |

### VG

| Krav | Var det uppfylls |
| --- | --- |
| Välstrukturerad navigering | `src/components/Navigation/Navigation.tsx` med `NavLink`, aktiv markering och gemensamma rutter i `src/config/routes.ts` |
| Utförlig felhantering med friendly message | `src/api/client.ts` översätter HTTP-statusar, nätverksfel, tidsgränser och ogiltig JSON till svenska meddelanden. `src/utils/errors.ts` ser till att tekniska fel aldrig läcker ut i gränssnittet |
| Välstrukturerat filsystem | Ett tydligt ansvar per mapp: API, komponenter, konfiguration, hooks, sidor, typer och verktygsfunktioner |

## Teknikstack

- **React 19** och **TypeScript**
- **Vite** för utvecklingsserver och bygge
- **react-router-dom** för navigering
- **TanStack Query** för hämtning, cachning och retry
- **ESLint** med TypeScript- och React-regler

## Kom igång

```bash
npm install
npm run dev
```

Appen startar på adressen som Vite skriver ut, vanligtvis
`http://localhost:5173`.

Övriga kommandon:

```bash
npm run build   # typkontroll + produktionsbygge
npm run lint    # ESLint
npm run preview # förhandsgranska produktionsbygget
```

### Miljövariabler

Appen fungerar utan konfiguration eftersom kursens publika API-adress och
demonyckel används som standard. Vill du peka mot en annan instans kan du skapa
en `.env`-fil utifrån `.env.example`:

```env
VITE_API_BASE_URL=https://api-userapi.onrender.com/api
VITE_API_KEY=elev-hemlighet-2026
```

`.env` är ignorerad av Git. Den inbyggda nyckeln är en publik demonyckel för
kursen och ska inte behandlas som en riktig hemlighet.

## API

Appen anropar:

```text
GET https://api-userapi.onrender.com/api/users/getUsers
Header: x-api-key: <nyckel>
```

API:et har två viktiga begränsningar:

1. **Max 100 anrop per dygn.** Därför cachas svaret i 30 minuter och
   bakgrundsrefetchning är avstängd.
2. **Tjänsten kan sova.** Den ligger på Render och kan svara långsamt eller
   med `503` när den startas. Appen visar då ett tydligt felmeddelande och en
   knapp för att försöka igen.

## Felhantering

Alla anrop går genom `src/api/client.ts`. Där:

- översätts HTTP-statusar (`401`, `403`, `404`, `429`, `5xx`) till begripliga
  svenska meddelanden,
- fångas nätverksfel och tidsgränser (15 sekunder),
- kontrolleras att svaret är giltig JSON,
- kastas ett `ApiError` med både ett användarvänligt meddelande och teknisk
  information för felsökning.

`src/api/users.ts` kontrollerar dessutom att svaret är en lista och att varje
användare har de fält som appen kräver. På så sätt ger oväntad data ett tydligt
fel i stället för en krasch i en komponent.

## Mappstruktur

```text
src/
├── api/            # HTTP-klient och API-anrop
├── components/     # Återanvändbara komponenter
│   ├── Navigation/
│   ├── StateViews/ # Laddning, fel och tomt läge
│   └── Users/
├── config/         # Rutter och TanStack Query-konfiguration
├── hooks/          # useUsers
├── pages/          # En fil per vy
├── types/          # Typer för API-data
└── utils/          # Formatering och felmeddelanden
```

## Tekniska val

- **react-router-dom** valdes för att appen ska ha riktiga URL:er som går att
  dela och bokmärka. `NavLink` ger aktiv markering och 404-rutten fångar okända
  adresser.
- **TanStack Query** valdes i stället för `useEffect` + `useState` eftersom det
  ger cachning, retry, avbrytbara anrop och tydliga `isPending`/`isError`-lägen
  utan egen bokföring.
- **Centrala rutter** i `src/config/routes.ts` gör att navigering och länkar
  använder samma sökvägar.
- **Runtime-kontroll av API-data** gör felhanteringen komplett: TypeScript
  skyddar vid utveckling, kontrollen skyddar vid körning.
- **Aggressiv cachning** är ett medvetet val för att skydda API:ets
  anropsgräns.

## Git

Projektet versionshanteras med Git. `node_modules`, `dist` och lokala
miljöfiler är undantagna i `.gitignore`.
