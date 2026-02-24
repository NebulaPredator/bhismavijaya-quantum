# Gesture Controlled 3D Voxel Builder

A real-time gesture-based 3D construction system built using:

- Three.js
- MediaPipe Hands
- WebGL

## Features

- Real-time hand tracking
- Pinch-to-build (Right hand)
- Pinch-to-delete (Left hand)
- Grid snapping system
- Ghost preview cube
- Animated voxel placement
- Performance capped voxel count

## How It Works

The system maps normalized fingertip coordinates from MediaPipe into a 3D world space.
Positions are snapped to a virtual grid.
Pinch gestures trigger voxel creation or deletion.

## Tech Concepts Used

- Vector math
- Spatial coordinate transformation
- Gesture detection thresholds
- State management
- Performance optimization via shared geometry
- Real-time rendering loop
