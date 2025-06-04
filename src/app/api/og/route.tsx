import { ImageResponse } from 'next/og';
import { DATA } from '~/config';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || DATA.name;
        const description = searchParams.get('description') || DATA.description;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        backgroundImage: 'linear-gradient(45deg, #000 0%, #111 100%)',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '80px',
                            textAlign: 'center',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '64px',
                                fontWeight: 'bold',
                                color: '#fff',
                                marginBottom: '24px',
                                lineHeight: '1.1',
                                maxWidth: '900px',
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            style={{
                                fontSize: '28px',
                                color: '#888',
                                maxWidth: '800px',
                                lineHeight: '1.4',
                            }}
                        >
                            {description}
                        </p>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            right: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            color: '#666',
                            fontSize: '20px',
                        }}
                    >
                        <span>{DATA.url.replace('https://', '')}</span>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        return new Response('Failed to generate image', { status: 500 });
    }
}