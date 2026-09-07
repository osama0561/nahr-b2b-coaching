from pathlib import Path
from google import genai
from google.genai import types

secrets = {}
for line in Path('/opt/data/secrets.env').read_text(errors='ignore').splitlines():
    if '=' in line and not line.lstrip().startswith('#'):
        k, v = line.split('=', 1)
        secrets[k.strip()] = v.strip().strip('"').strip("'")

client = genai.Client(api_key=secrets['GOOGLE_AI_STUDIO_API_KEY'])
model = secrets.get('GEMINI_IMAGE_MODEL', 'gemini-3-pro-image-preview')
out = Path('/opt/data/nahr-b2b-coaching/assets')
out.mkdir(exist_ok=True)

prompts = {
    'hero-visual.jpg': '''Create a premium website hero illustration for a Saudi B2B AI enablement company named Nahr. No text, no logos, no letters, no fake UI text. Visual: warm sand and deep teal palette, realistic high-end 3D isometric composition, an elegant flowing river-like path connecting four abstract work modules: diagnosis, training, templates, follow-up. Must look like a polished enterprise consulting website asset, not neon cyberpunk, not generic AI robot, not glossy toy. Plenty of clean negative space, soft shadows, 16:9 landscape.''',
    'process-graphic.jpg': '''Create a clean professional 3D infographic-style image with no readable text and no logos. Theme: custom AI training process for employees. Four connected abstract stations on a warm neutral desk: discovery map, workshop board, template library, measurement dashboard. Saudi/GCC enterprise feel, sand, ink, and muted teal colors. Avoid humanoid robots, fake words, neon gradients, clutter, tiny unreadable text. 16:9 landscape.''',
    'systems-graphic.jpg': '''Create a premium abstract 3D visual for internal workflow systems: organized cards, connected nodes, report sheets, SOP documents, and a simple dashboard arranged around a river-like line. No text, no logos, no numbers, no fake UI words. Warm beige paper, dark ink, muted teal, elegant shadows, enterprise consulting style, not futuristic, not childish. 16:9 landscape.''',
}

for filename, prompt in prompts.items():
    resp = client.models.generate_content(
        model=model,
        contents=[types.Content(role='user', parts=[types.Part.from_text(text=prompt)])],
        config=types.GenerateContentConfig(response_modalities=['IMAGE','TEXT'])
    )
    saved = False
    for cand in resp.candidates or []:
        for part in cand.content.parts or []:
            if part.inline_data:
                path = out / filename
                path.write_bytes(part.inline_data.data)
                print(filename, part.inline_data.mime_type, len(part.inline_data.data), path)
                saved = True
                break
        if saved:
            break
    if not saved:
        print('NO_IMAGE', filename, resp)
        raise SystemExit(2)
