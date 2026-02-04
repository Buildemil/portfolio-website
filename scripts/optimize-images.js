#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Mapping der alten Bildnamen zu Projekt-Slugs
const imageMapping = {
  'scent-design.jpg': { project: 'ai-scent-design', name: 'hero.jpg' },
  'scent.jpg': { project: 'ai-scent-design', name: 'detail-01.jpg' },
  'ai-workflows.png': { project: 'custom-ai-workflows', name: 'hero.jpg' },
  'lichtobjekt.png': { project: 'lichtobjekt', name: 'hero.jpg' },
  'bmw-bubble.jpg': { project: 'bmw-bubble', name: 'hero.jpg' },
  'klangmagazin.jpg': { project: '5x-plus-magazine', name: 'hero.jpg' },
  'sarah-in-the-bathroom.jpg': { project: 'sarah-in-the-bathroom', name: 'hero.jpg' },
  'music.jpg': { project: 'music-production', name: 'hero.jpg' },
  'acting.png': { project: 'acting', name: 'hero.jpg' },
  'handcraft.png': { project: 'handcraft-analog-work', name: 'hero.jpg' },
};

// Portrait-Bild separate behandeln
const portraitImages = ['portrait.jpg', 'portrait.jpeg'];

const projectsDir = path.join(__dirname, '../public/images/projects');
const sharedDir = path.join(__dirname, '../public/images/shared');

async function getFileSize(filePath) {
  const stats = await fs.promises.stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

async function optimizeImage(inputPath, outputPath, isPortrait = false) {
  const ext = path.extname(inputPath).toLowerCase();
  const originalSize = await getFileSize(inputPath);

  let pipeline = sharp(inputPath);

  if (ext === '.png') {
    // PNG: Konvertiere zu JPG für bessere Kompression (außer bei Transparenz)
    const metadata = await sharp(inputPath).metadata();
    if (metadata.hasAlpha) {
      // PNG mit Transparenz: als PNG optimieren
      pipeline = pipeline.png({ quality: 90, compressionLevel: 9 });
    } else {
      // PNG ohne Transparenz: zu JPG konvertieren
      outputPath = outputPath.replace('.png', '.jpg');
      pipeline = pipeline.jpeg({ quality: 85, progressive: true });
    }
  } else if (ext === '.jpg' || ext === '.jpeg') {
    // Portrait-Bild besonders stark komprimieren
    const quality = isPortrait ? 80 : 85;
    pipeline = pipeline.jpeg({ quality, progressive: true });
  }

  // Bei sehr großen Bildern: max-width setzen
  const metadata = await sharp(inputPath).metadata();
  if (metadata.width > 2400) {
    pipeline = pipeline.resize(2400, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });
  }

  await pipeline.toFile(outputPath);

  const newSize = await getFileSize(outputPath);
  const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);

  return {
    original: formatBytes(originalSize),
    optimized: formatBytes(newSize),
    saved: `${saved}%`,
  };
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  const results = [];

  // 1. Optimiere Portrait-Bilder
  console.log('📸 Optimizing portrait images...');
  for (const portraitFile of portraitImages) {
    const inputPath = path.join(__dirname, '../public/images', portraitFile);

    if (fs.existsSync(inputPath)) {
      const outputPath = path.join(sharedDir, 'portrait-hero.jpg');

      try {
        const result = await optimizeImage(inputPath, outputPath, true);
        const originalSize = await getFileSize(inputPath);
        const newSize = await getFileSize(outputPath);

        totalOriginalSize += originalSize;
        totalOptimizedSize += newSize;

        results.push({
          file: portraitFile,
          ...result,
        });

        console.log(`  ✅ ${portraitFile}: ${result.original} → ${result.optimized} (saved ${result.saved})`);
      } catch (error) {
        console.error(`  ❌ Error processing ${portraitFile}:`, error.message);
      }
    }
  }

  // 2. Optimiere Projekt-Bilder
  console.log('\n🎨 Optimizing project images...');

  for (const [oldName, mapping] of Object.entries(imageMapping)) {
    const inputPath = path.join(projectsDir, oldName);

    if (fs.existsSync(inputPath)) {
      const outputDir = path.join(projectsDir, mapping.project);
      const outputPath = path.join(outputDir, mapping.name);

      // Stelle sicher, dass Output-Ordner existiert
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      try {
        const result = await optimizeImage(inputPath, outputPath);
        const originalSize = await getFileSize(inputPath);
        const newSize = await getFileSize(outputPath);

        totalOriginalSize += originalSize;
        totalOptimizedSize += newSize;

        results.push({
          file: `${mapping.project}/${mapping.name}`,
          ...result,
        });

        console.log(`  ✅ ${oldName} → ${mapping.project}/${mapping.name}`);
        console.log(`     ${result.original} → ${result.optimized} (saved ${result.saved})`);
      } catch (error) {
        console.error(`  ❌ Error processing ${oldName}:`, error.message);
      }
    } else {
      console.log(`  ⚠️  ${oldName} not found, skipping...`);
    }
  }

  // 3. Optimiere Logo-Bilder
  console.log('\n🏷️  Optimizing logo images...');
  const logosDir = path.join(__dirname, '../public/images/logos');

  if (fs.existsSync(logosDir)) {
    const logoFiles = fs.readdirSync(logosDir);

    for (const logoFile of logoFiles) {
      const inputPath = path.join(logosDir, logoFile);
      const ext = path.extname(logoFile).toLowerCase();

      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outputPath = inputPath; // In-place optimization
        const tempPath = inputPath + '.tmp';

        try {
          const result = await optimizeImage(inputPath, tempPath);
          const originalSize = await getFileSize(inputPath);
          const newSize = await getFileSize(tempPath);

          // Replace original mit optimiertem
          fs.renameSync(tempPath, inputPath);

          totalOriginalSize += originalSize;
          totalOptimizedSize += newSize;

          console.log(`  ✅ ${logoFile}: ${result.original} → ${result.optimized} (saved ${result.saved})`);
        } catch (error) {
          console.error(`  ❌ Error processing ${logoFile}:`, error.message);
          // Cleanup temp file if error
          if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
          }
        }
      }
    }
  }

  // 4. Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total original size:  ${formatBytes(totalOriginalSize)}`);
  console.log(`Total optimized size: ${formatBytes(totalOptimizedSize)}`);
  console.log(`Total saved:          ${formatBytes(totalOriginalSize - totalOptimizedSize)} (${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%)`);
  console.log('='.repeat(60));

  console.log('\n✅ Optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Lege deine neuen Bilder in die Projekt-Ordner:');
  console.log('      public/images/projects/[slug]/detail-XX.jpg');
  console.log('   2. Update lib/projects.ts mit neuen Bildpfaden');
  console.log('   3. Teste mit: npm run dev');
}

main().catch(console.error);
