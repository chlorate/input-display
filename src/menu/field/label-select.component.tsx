import {observer} from "inferno-mobx";
import {LabelPosition, labelPositionNames, sortedLabelPositions} from "../../control/label-position";
import {LabelReplacement, labelReplacementNames, sortedLabelReplacements} from "../../control/label-replacement";

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
export const LabelSelectComponent = observer((props: Props) => {
	var classSuffix = props.replacement ? "replacement" : "position";

	var options = [<option value="">Hidden</option>];
	if (props.replacement) {
		sortedLabelReplacements.forEach((r) => {
			options.push(<option value={r}>{labelReplacementNames[r]}</option>);
		});
	}
	sortedLabelPositions.forEach((p) => {
		options.push(<option value={p}>{labelPositionNames[p]}</option>);
	});
			
	return (
		<div className={
			"form-group " +
			`form-group-label-${classSuffix} ` +
			(props.className || "")
		}>
			<label htmlFor={props.id}>
				{props.label}
			</label>
			<select
				className={`form-control form-control-label-${classSuffix}`}
				id={props.id}
				value={props.value || ""}
				onChange={props.onChange}
			>
				{options}
			</select>
		</div>
	);
});
