import {connect} from "inferno-mobx";
import {LabelPosition, labelPositionNames, sortedLabelPositions} from "../../widget/label-position";
import {LabelReplacement, labelReplacementNames, sortedLabelReplacements} from "../../widget/label-replacement";

interface Props {
	className?: string;
	id: string;
	label: string;
	value: LabelPosition | LabelReplacement;
	replacement?: boolean;
	onChange;
}

/**
 * A dropdown for selecting a position of a label.
 */
export const LabelSelectComponent = connect((props: Props) => (
	<div className={
		"form-group " +
		`form-group-label-${props.replacement ? "replacement" : "position"} ` +
		(props.className || "")
	}>
		<label for={props.id}>
			{props.label}
		</label>
		<select
			className={`form-control form-control-label-${props.replacement ? "replacement" : "position"}`}
			id={props.id}
			value={props.value || ""}
			onChange={props.onChange}
		>
			<option value="">Hidden</option>
			{props.replacement && sortedLabelReplacements.map((replacement) => (
				<option value={replacement}>{labelReplacementNames[replacement]}</option>
			))}
			{sortedLabelPositions.map((position) => (
				<option value={position}>{labelPositionNames[position]}</option>
			))}
		</select>
	</div>
));
