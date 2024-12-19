import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
		const  query  = request.json()

		if (!query) {
			return NextResponse.json({ error: "Invalid request" }, { status: 400 });
		}

		const answer = await getAnswer(query);
		NextResponse.json({ answer });
	} catch (error) {
		console.error("Error:", error);
        // Handle the error
        // Return a 500 status code and a JSON response body
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
	}
}