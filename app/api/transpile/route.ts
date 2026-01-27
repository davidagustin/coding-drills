import { NextResponse } from 'next/server';
import ts from 'typescript';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (typeof code !== 'string') {
      return NextResponse.json({ error: 'Code must be a string' }, { status: 400 });
    }

    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.None,
        removeComments: false,
      },
    });

    return NextResponse.json({ code: result.outputText });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Transpilation failed' },
      { status: 500 },
    );
  }
}
