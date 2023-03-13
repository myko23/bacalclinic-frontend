import { Document, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";
import Modal from "components/common/Modal/Modal";
import React from "react";
import styles from "./PrintBillings.module.scss";

const PrintBillings = ({ enabled = false, onCancel, data }) => {
	if (!enabled) return null;

	const renderHMOData = () => {
		return data.map((item, index) => {
			return (
				<View key={index} style={pdfStyles.dataSet}>
					<View style={pdfStyles.hmoHeaderContainer}>
						<Text style={pdfStyles.hmoLabel}>HMO</Text>
						<Text style={pdfStyles.hmo}>{item.hmo}</Text>
					</View>
					<View style={pdfStyles.hmoTotalContainer}>
						<Text style={pdfStyles.totalLabel}>Total</Text>
						<Text style={pdfStyles.total}>P {item.total}</Text>
					</View>
				</View>
			);
		});
	};

	return (
		<Modal onCancel={onCancel}>
			<div className={styles.container}>
				<PDFViewer className={styles.pdfViewer} showToolbar={true}>
					<Document>
						<Page size="A4" style={pdfStyles.page}>
							<View style={pdfStyles.dataContainer}>{renderHMOData()}</View>
						</Page>
					</Document>
				</PDFViewer>
			</div>
		</Modal>
	);
};

const pdfStyles = StyleSheet.create({
	page: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	dataContainer: {
		gap: 20,
	},
	dataSet: {
		paddingBottom: 20,
		borderBottom: 1,
		borderBottomColor: "grey",
	},
	hmoHeaderContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	hmoTotalContainer: {
		flexDirection: "row",
		gap: 20,
	},
	hmoLabel: {
		fontSize: 16,
	},
	hmo: {
		fontSize: 32,
		fontWeight: "bold",
	},
});

export default PrintBillings;
