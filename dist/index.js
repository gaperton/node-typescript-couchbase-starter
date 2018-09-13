"use strict";
//import dotenv from "dotenv";
//dotenv.config({ path : ".env" });
const indexHtml = (session) => `
    <html>
        <script type="text/javascript">
            window.__PRELOAD_SESSION_DATA___ = ${JSON.stringify(session)};
        </script>
    </html>
`;
//# sourceMappingURL=index.js.map