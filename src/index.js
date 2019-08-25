import {addAdditionalConverters, getConverters} from "./converter";
import detectInput from "./input";
import detectOutput from "./output";
import Log from "./log/Log";

/**
 * @param {string|Buffer|ArrayBuffer|Uint8Array|Array} inputParam
 * @param {string} outputParam
 * @param {Object} options
 *
 * @returns {Promise<string|Buffer|ArrayBuffer|Uint8Array>}
 *
 * @throws {Error}
 */
async function ConvertMinecraftJavaTextureToBedrock(inputParam, outputParam, options = {}) {
	const log = new Log(options.logCallback, options.verbose);

	const input = await detectInput(inputParam);

	const output = await detectOutput(outputParam, input, log);

	await output.init();

	for await (const converter of getConverters(output, log)) {
		await addAdditionalConverters(...await converter.convert());
	}

	return output.generate();
}

export default ConvertMinecraftJavaTextureToBedrock;