/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
          <script src="//code.jivosite.com/widget/DvSEX9rXIJ" async></script> 
					<script src="/static/datafeeds/udf/dist/polyfills.js" />
					<script src="/static/datafeeds/udf/dist/bundle.js" />
					<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js"></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
